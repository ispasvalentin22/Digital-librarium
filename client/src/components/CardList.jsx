import React, { useState } from "react";
import Card from "./Card";

function CardList({ results }) {
  let data = [];
  if (results.data) {
    data = results.data;
  }

  const [selectedArticles, setSelectedArticles] = useState([]);

  const handleCheckboxChange = (event, article) => {
    if (event.target.checked) {
      setSelectedArticles([...selectedArticles, article]);
    } else {
      setSelectedArticles(selectedArticles.filter(a => a !== article));
    }
  };

  function jsonToBibtex(article) {
    let year, author;
    const entryType = 'article';
  
    const fields = Object.keys(article)
      .filter(key => key !== 'type' && key !== 'id')
      .map(key => {
        const value = article[key];
        if (typeof value === 'string') {
          return `${key}={${value}}`;
        } else if (value && Array.isArray(value)) {
          if (value[0]?.text) {
            const authorsArray = value.map(val => val.text);
            author = authorsArray[0];
            return `${key}={${authorsArray.join(' and ')}}`;
          }
          if (value[0]?.name) {
            const authorsArray = value.map(val => val.name);
            author = authorsArray[0];
            return `${key}={${authorsArray.join(' and ')}}`;
          }
        } else {
          if (value && value.text) {
            author = value.text;
            return `${key}={${value.text}}`;
          }
        }
      })
      .join(',\n  ');

    const authorNames = author.split(' ');
    const firstAuthorName = authorNames[authorNames.length - 1];
    if (article.publicationDate) {
      year = article.publicationDate.split('-')[0];
    } else if (article.year) {
      year = article.year;
    }
    let firstWordOfTitle = article.title.split(' ')[0];
    let articleIdentifier = '';
    if (firstAuthorName !== undefined) articleIdentifier += firstAuthorName;
    if (year !== undefined) articleIdentifier += year;
    if (firstWordOfTitle !== undefined) articleIdentifier += firstWordOfTitle;
  
    return `@${entryType}{${articleIdentifier}\n  ${fields}\n}`;
  }

  function selectedArticlesToBibtex(selectedArticles) {
    return selectedArticles.map(jsonToBibtex).join('\n\n');
  }

  const handleDownload = () => {
    // Convert selected articles to BibTeX
    const bibtex = selectedArticlesToBibtex(selectedArticles);

    // Download BibTeX file
    const element = document.createElement('a');
    const file = new Blob([bibtex], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'selected_articles.txt';
    document.body.appendChild(element);
    element.click();
  };
  
  return (
    <div className="result"> 
      {data && Object.keys(data).length > 0 ? <button onClick={handleDownload} className="download">Download selected articles as BibTeX</button> : null }
      {data?.papersFromSemanticScholar?.length > 0 ? <h1 className="librariesTitle">From Semantic Scholar:</h1> : null}
      {data?.papersFromSemanticScholar?.length && data.papersFromSemanticScholar.map((item) => (
        <div className="checkboxTitle">
          <input
            className="checkbox"
            type="checkbox"
            checked={selectedArticles.includes(item)}
            onChange={event => handleCheckboxChange(event, item)}
          />
          <Card key={item.paperId} article={item} className="card" />
        </div>
      ))}
      {data?.papersFromDblp?.length > 0 ? <h1 className="librariesTitle">From Dblp:</h1> : null}
      {data?.papersFromDblp?.length && data?.papersFromDblp.map((item) => (
        <div className="checkboxTitle">
          <input
            className="checkbox"
            type="checkbox"
            checked={selectedArticles.includes(item)}
            onChange={event => handleCheckboxChange(event, item)}
          />
          <Card key={item.paperId} article={item} className="card" />
        </div>
      ))}
      {data?.papersFromElsevier?.length > 0 ? <h1 className="librariesTitle">From Elsevier:</h1> : null}
      {data.papersFromElsevier?.length && data.papersFromElsevier.map((item) => (
        <div className="checkboxTitle">
          <input
            className="checkbox"
            type="checkbox"
            checked={selectedArticles.includes(item)}
            onChange={event => handleCheckboxChange(event, item)}
          />
          <Card key={item.paperId} article={item} className="card" />
        </div>
      ))}
      {data?.papersFromGoogleScholar?.length > 0 ? <h1 className="librariesTitle">From Google Scholar:</h1> : null}
      {data.papersFromGoogleScholar?.length && data.papersFromGoogleScholar.map((item) => (
        <div className="checkboxTitle">
          <input
            className="checkbox"
            type="checkbox"
            checked={selectedArticles.includes(item)}
            onChange={event => handleCheckboxChange(event, item)}
          />
          <Card key={item.paperId} article={item} className="card" />
        </div>
      ))}
    </div>
  )
}

export default CardList;