import React from "react";
import Card from "./Card";

function CardList({ results }) {
  let data = [];
  if (results.data) {
    data = results.data;
  }
  // console.log(results);
  
  return (
    <div className="result"> 
      {data.map((item) => ( // TODO NO RESULTS FOUND CASE
        <Card key={item.paperId} article={item} className="card" />
      ))}
    </div>
  )
}

export default CardList;