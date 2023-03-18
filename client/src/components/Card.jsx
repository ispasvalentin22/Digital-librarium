import React, { useState } from "react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Link } from 'react-router-dom';
import Article from './Article';
import Popover from '@mui/material/Popover';
import MouseOverPopover from './Popover';
import Typography from '@mui/material/Typography';

function Card(props) {
  const { article } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="resultCard">
      <Link to={`articles/${article.paperId}`}>
        {article.title}
      </Link>
      <section className="under-title">
        {article.authors?.map((author, idx) => (
          idx < 2 ? <h2 className="author">{author.name},</h2> : null
        ))}
        {article.authors?.length - 2 > 0 ? <h2>+{article.authors?.length - 2} authors</h2> : null}
        <h2 className="dot-authors">•</h2>
        {article.fieldsOfStudy?.map(field => (
          <h1 className="flex-item">{field}</h1>
        ))}
        <h1 className="flex-item">• {article.venue}</h1>
        <h1 className="flex-item">• {article.publicationDate}</h1>
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