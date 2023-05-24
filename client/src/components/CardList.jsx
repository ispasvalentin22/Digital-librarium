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
    const entryType = article.type;
    console.log(article);
  
    const fields = Object.keys(article)
      .filter(key => key !== 'type' && key !== 'id')
      .map(key => {
        const value = article[key];
        if (typeof value === 'string') {
          return `${key}={${value}}`;
        } else if (Array.isArray(value)) {
          if (value[0].text) {
            const authorsArray = value.map(val => val.text);
            return `${key}={${authorsArray.join(' and ')}}`;
          }
        } else {
          return `${key}={${value.text}}`;
        }
      })
      .join(',\n  ');
  
    return `@${entryType}{\n  ${fields}\n}`;
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
      {data.length > 0 ? <button onClick={handleDownload} className="download">Download selected articles as BibTeX</button> : null }
      {data.map((item) => ( // TODO NO RESULTS FOUND CASE
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