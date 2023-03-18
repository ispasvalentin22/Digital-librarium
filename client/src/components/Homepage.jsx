import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from "./SearchBar";
import CardList from "./CardList";
import Progress from './Progress';
import { useDispatch } from 'react-redux';
import { articlesSave } from '../redux/article/article.actions';

function Homepage() {
  const [state, setState] = useState({
    results: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onSearch = async text => {
    setIsLoading(true);
    const results = await axios.get(`http://localhost:4000/api/search/${text}`);
    const articles = results.data;
    // console.log(articles);

    dispatch(articlesSave({ articles }));

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