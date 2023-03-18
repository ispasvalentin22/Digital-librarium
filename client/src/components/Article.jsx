import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Article() {
  const { id } = useParams();
  const articles = useSelector(state => state.articles);
  console.log(articles);
  
  return (
    <div className="article-page">
      {id}
    </div>
  )
}

export default Article;