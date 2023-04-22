import React from "react";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function SearchBar(props) {
  const { onSearch, isLoading } = props;

  const [searchText, setSearchText] = useState('');
  const [checkedTitle, setCheckedTitle] = useState(true);
  const [checkedAuthor, setCheckedAuthor] = useState(true);

  const handleInput = e => {
    e.preventDefault();
    const text = e.target.value;
    setSearchText(text);
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    let fieldsToSearch = '';
    checkedTitle && (fieldsToSearch += 'title,');
    checkedAuthor && (fieldsToSearch += 'author,');

    if (fieldsToSearch === '') {
      fieldsToSearch += 'title';
    }

    if (fieldsToSearch.endsWith(',')) {
      fieldsToSearch = fieldsToSearch.slice(0, -1);
    }
    onSearch(searchText, fieldsToSearch);
  }

  const handleChangeAuthor = e => {
    setCheckedAuthor(e.target.checked);
  }

  const handleChangeTitle = e => {
    setCheckedTitle(e.target.checked);
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
      <FormControlLabel control={<Checkbox checked={checkedTitle} onChange={handleChangeTitle} defaultChecked />} label="by title" sx={{ marginLeft: 2 }} />
      <FormControlLabel control={<Checkbox checked={checkedAuthor} onChange={handleChangeAuthor} defaultChecked />} label="by author" />
    </form>
  )
}

export default SearchBar;