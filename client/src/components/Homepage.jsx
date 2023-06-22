import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from "./SearchBar";
import CardList from "./CardList";
import Progress from './Progress';

function Homepage() {
  const [state, setState] = useState({
    results: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async (text, libraries) => {
    setIsLoading(true);
    const results = await axios.post(`http://localhost:4000/api/search/${text}`, libraries);

    setIsLoading(false);
    setState(prevState => {
      return { ...prevState, results: results }
    });
  }

  return (
    <div className="homepage">
      <h2 className="title is-2 has-text-centered">
        Digital Librarium
      </h2>
      <SearchBar className="searchbar" onSearch={onSearch} isLoading={isLoading} />
      {isLoading ? <Progress className="progress" /> : null}
      <CardList results={state.results} />
    </div>
  );
}

export default Homepage;