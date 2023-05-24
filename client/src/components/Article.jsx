import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

function Article() {
  const { id } = useParams();
  const { articles } = useSelector(state => state.articles);
  const article = articles.find(article => article.paperId === id);
  const pdf = article.openAccessPdf ? article.openAccessPdf.url : '#';
  
  return (
    <div className="article-page">
      <h1 className="article-title">{article.title}</h1>
      <section className="under-title">
        {Array.isArray(article.authors) ? (article.authors?.map((author, idx) => (
          idx < 2 ? <h2 className="author">{author.name},</h2> : null
        ))) : <h2 className="author">{article.authors.text}</h2>}
        {article.authors?.length - 2 > 0 ? <h2>+{article.authors?.length - 2} authors</h2> : null}
        <h2 className="dot-authors">•</h2>
        {article.fieldsOfStudy?.map(field => (
          <h1 className="flex-item">{field}</h1>
        ))}
        <h1 className="flex-item">• {article.venue}</h1>
        <h1 className="flex-item">• {article.publicationDate}</h1>
      </section>
      <h3 className="article-abstract">{article.abstract}</h3>
      <Button variant="contained" href={pdf}>Download PDF</Button>
    </div>
  )
}

export default Article;