import React from "react";
import Card from "./Card";

function CardList({ results }) {
  let data = [];
  if (results.data) {
    data = results.data[0];
  }
  // console.log(results);
  
  return (
    <div className="result">
      {data.map((item) => (
        <Card key={item.paperId} article={item} className="card" />
      ))}
    </div>
  )
}

export default CardList;