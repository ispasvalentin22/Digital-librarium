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
  const limit = 10;
  let papers = [];

  const { fieldsToSearch, keywords } = req.params;

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

  const response = await axios.get(`https://dblp.org/search/publ/api?q=${keywords}&format=json`);
  const papersFromDblp = response.data.result.hits.hit?.map(hit => {
    return {
      ...hit.info,
      authors: hit.info.authors.author
    }
  });
  papers.push(papersFromDblp);
  console.log(papersFromDblp);

  /* TODO: for articles that are on semanticscholar link the URL to semanticscholar on article title instead of making a custom design
  ?? Need to filter the articles if the same articles comes from 2 libraries ??
  ?? Maybe it's also possible to do the same for DBLP articles. The user goes to dblp when cliking the article title 
  ?? Semantic scholar can search by title or by author but on DBLP search is by both */
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
    // console.log(papers);
    return papers;
  }
}

module.exports = app;