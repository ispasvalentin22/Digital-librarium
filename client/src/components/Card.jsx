import React, { useState, useEffect } from "react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

function Card(props) {
  const { article } = props;
  const [myUrl, setMyUrl] = useState('https://example.com');

  useEffect(() => {
    setMyUrl(article.url);
  }, [article.url]);

  return (
    <div className="resultCard">
      <h1><a href={myUrl}>{article.title}</a></h1>
      <section className="under-title">
        {Array.isArray(article.authors) ? article.authors?.map((author, idx) => (
          idx < 2 ? <h2 className="author">{author.name || author.text},</h2> : null
        )) : <h2 className="author">{article.authors.text}</h2> }
        {article.authors?.length - 2 > 0 ? <h2>+{article.authors?.length - 2} authors</h2> : null}
        <h2 className="dot-authors">•</h2>
        {article.fieldsOfStudy?.map(field => (
          <h1 className="flex-item">{field}</h1>
        ))}
        <h1 className="flex-item">• {article.venue}</h1>
        <h1 className="flex-item">• {article.publicationDate || article.year}</h1>
      </section>
      <section className="info">
        <span className="citations">
          <FormatQuoteIcon className="quote-icon" sx={{ fontSize: 18 }} />
          {article.citationCount}
        </span>
        {article?.openAccessPdf?.url ? <a className="pdf" href={article.openAccessPdf.url}>PDF</a> : null}
      </section>
    </div>
  )
}

export default Card;