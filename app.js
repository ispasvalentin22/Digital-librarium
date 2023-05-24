const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Digital Librarium! More yet to come...');
});

app.get('/api/search/:fieldsToSearch/:keywords', async (req, res) => {
  const limit = 5;
  let papers = [];

  const { fieldsToSearch, keywords } = req.params;

  // Semantic Scholar 
  if (fieldsToSearch.includes('title')) {
    const response = await searchByTitle(keywords, limit);
    papers = response;
  }

  if (fieldsToSearch.includes('author')) {
    const response = await searchByAuthor(keywords, limit);
    if (response && response.length) {
      response.forEach(article => papers.push(article));
    }
  }

  // DBLP
  const response = await axios.get(`https://dblp.org/search/publ/api?q=${keywords}&format=json`);
  const papersFromDblp = response.data.result.hits.hit?.map(hit => {
    return {
      ...hit.info,
      authors: hit.info.authors.author
    }
  });
  papers.push(...papersFromDblp);

  // ELSEVIER
  const apiKey = '32f3a26cb29567a1d001c46f65e6c19b';
  const count = 25;
  const answer = await axios.get(`https://api.elsevier.com/content/search/scopus?apiKey=${apiKey}&count=${count}&query=${keywords}`);
  const articlesFromElsevier = answer.data['search-results'].entry.map(article => {
    return {
      id: article['dc:identifier'],
      title: article['dc:title'],
      authors: { text: article['dc:creator']},
      venue: article['prism:publicationName'],
      url: article['prism:url']
    }
  });
  papers.push(...articlesFromElsevier);

  // Google Scholar
  // const apiKeyGS = '8594cc15ad46993b1231ee63bc7a9bd19afd7cbefb5a467c392a098e3ace9f63';
  // const responseFromGS = await axios.get(`https://serpapi.com/search.json?engine=google_scholar_profiles&mauthors=Mihaescu&api_key=`);

  papers.forEach(paper => paper.type = 'ARTICLE');
  res.send(papers);
});

async function searchByTitle(keywords, limit) {
  const fieldsToReturn = `title,abstract,publicationDate,referenceCount,citationCount,influentialCitationCount,openAccessPdf,authors,venue,fieldsOfStudy,citations,references`;
  const response = await axios.get(
    `https://api.semanticscholar.org/graph/v1/paper/search?query=${keywords}&limit=${limit}&fields=${fieldsToReturn}`
  );

  if (response?.data?.data) {
    return response.data.data;
  }
}

async function searchByAuthor(keywords, limit) {
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