const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors()); 
app.use(express.json());

app.post('/api/search/:keywords', async (req, res) => {
  const limit = 5;
  let papersFromSemanticScholar = [];
  let papersFromDblp;
  let papersFromElsevier;
  let papersFromGoogleScholar;

  const { keywords } = req.params;
  const libraries = req.body;

  // Semantic Scholar 
  if (libraries.semanticScholar) {
    const response1 = await semanticScholarSearchByTitle(keywords, limit);
    papersFromSemanticScholar.push(...response1);
  
    const response = await semanticScholarsearchByAuthor(keywords, limit);
    if (response && response.length) {
      response.forEach(article => papersFromSemanticScholar.push(article));
    }
  }

  // DBLP
  if (libraries.dblp) {
    const response = await axios.get(`https://dblp.org/search/publ/api?format=json&q=${keywords}`);
    papersFromDblp = response.data.result.hits.hit?.map(hit => {
      return {
        ...hit.info,
        type: 'ARTICLE',
        authors: hit.info.authors.author
      }
    });
  }

  // ELSEVIER
  if (libraries.elsevier) {
    const apiKeyElsevier = '32f3a26cb29567a1d001c46f65e6c19b';
    const count = 25;
    const answer = await axios.get(`https://api.elsevier.com/content/search/scopus?apiKey=${apiKeyElsevier}&count=${count}&query=${keywords}`);
    papersFromElsevier = answer?.data?.['search-results']?.entry.map(article => {
      return {
        type: 'ARTICLE',
        id: article['dc:identifier'],
        title: article['dc:title'],
        authors: { text: article['dc:creator']},
        venue: article['prism:publicationName'],
        url: article['prism:url']
      }
    });
  }

  // Google Scholar
  if (libraries.googleScholar) {
    const apiKeyGS = '8594cc15ad46993b1231ee63bc7a9bd19afd7cbefb5a467c392a098e3ace9f63';
    const responseFromGS = await axios.get(`https://serpapi.com/search?engine=google_scholar&api_key=${apiKeyGS}&q=${keywords}`);
    papersFromGoogleScholar = responseFromGS.data?.organic_results?.map(article => {
      return {
        type: 'ARTICLE',
        id: article.result_id,
        title: article.title,
        authors: article.publication_info.authors,
        url: article?.resources?.find(resource => resource.file_format === 'PDF')?.link
      }
    });
  }

  const papers = {
    papersFromSemanticScholar,
    papersFromDblp,
    papersFromElsevier,
    papersFromGoogleScholar
  }

  res.send(papers);
});

async function semanticScholarSearchByTitle(keywords, limit) {
  const fieldsToReturn = `title,abstract,publicationDate,referenceCount,citationCount,influentialCitationCount,openAccessPdf,authors,venue,fieldsOfStudy,citations,references`;
  const response = await axios.get(
    `https://api.semanticscholar.org/graph/v1/paper/search?query=${keywords}&limit=${limit}&fields=${fieldsToReturn}`
  );

  if (response?.data?.data) {
    return response.data.data;
  }
}

async function semanticScholarsearchByAuthor(keywords, limit) {
  const fieldsToReturn = `name,aliases,paperCount,citationCount,papers.externalIds,papers.url,papers.title,papers.abstract,papers.venue,papers.year,papers.publicationVenue,papers.referenceCount,papers.citationCount,papers.isOpenAccess,papers.influentialCitationCount,papers.openAccessPdf,papers.fieldsOfStudy,papers.publicationDate,papers.authors`;
  const response = await axios.get(
    `https://api.semanticscholar.org/graph/v1/author/search?query=${keywords}&limit=${limit}&fields=${fieldsToReturn}`
  );

  if (response?.data?.data) {
    let papers = [];
    response.data.data.forEach(author => {
      papers.push(...author.papers);
    });
    return papers;
  }
}

module.exports = app;