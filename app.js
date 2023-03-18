const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Digital Librarium! More yet to come...');
});

app.get('/api/search/:keywords', async (req, res) => {
  app.get('/app/')
  console.log(req.params);
  const { keywords } = req.params;
  let papers = [];
  let offset = 0;
  const limit = 10;
  let response = await axios.get(
    `https://api.semanticscholar.org/graph/v1/paper/search?query=${keywords}&limit=${limit}&fields=title,abstract,publicationDate,referenceCount,citationCount,influentialCitationCount,openAccessPdf,authors,venue,fieldsOfStudy`
  );
  // console.log(response);

  papers.push(response.data.data);

  // if (response.data?.next > 0) {
  //   for (let i = 0; i < 5; i++) {
  //     response = await axios.get(
  //       `https://api.semanticscholar.org/graph/v1/paper/search?query=${keywords}&limit=${limit}&offset=${offset}&fields=title,abstract,publicationDate,referenceCount,citationCount,influentialCitationCount,openAccessPdf`
  //     );
  //     console.log(`Current step: ${i}`);

  //     papers.push(response.data.data);
  //     offset += 100;
  //   }
  // }
  res.send(papers);
});

module.exports = app;