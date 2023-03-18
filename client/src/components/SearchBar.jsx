import React from "react";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {
  const { onSearch, isLoading } = props;

  const [searchText, setSearchText] = useState('');

  const handleInput = e => {
    e.preventDefault();
    const text = e.target.value;
    setSearchText(text);
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchText);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="control">
        <input 
          className="input" 
          onChange={handleInput}
          type="search" 
          value={searchText} 
          placeholder="Search" 
        />
      </div>
      <div className="control">
        <button className="submit-button" type="submit" disabled={isLoading}>
          <SearchIcon />
        </button>
      </div>
    </form>
  )
}

export default SearchBar;