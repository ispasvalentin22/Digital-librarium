import React from "react";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function SearchBar(props) {
  const { onSearch, isLoading } = props;

  const [searchText, setSearchText] = useState('');
  const [semanticScholar, setSemanticScholar] = useState(true);
  const [dblp, setDblp] = useState(true);
  const [elsevier, setElsevier] = useState(true);
  const [googleScholar, setGoogleScholar] = useState(true);

  const handleInput = e => {
    e.preventDefault();
    const text = e.target.value;
    setSearchText(text);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const libraries = {
      semanticScholar,
      dblp,
      elsevier,
      googleScholar
    }
    
    onSearch(searchText, libraries);
  }

  const handleChangeSemanticScholar = e => {
    setSemanticScholar(e.target.checked);
  }

  const handleChangeDblp = e => {
    setDblp(e.target.checked);
  }

  const handleChangeElsevier = e => {
    setElsevier(e.target.checked);
  }

  const handleChangeGoogleScholar = e => {
    setGoogleScholar(e.target.checked);
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
      <FormControlLabel control={<Checkbox checked={semanticScholar} onChange={handleChangeSemanticScholar} defaultChecked />} label="Semantic Scholar" sx={{ marginLeft: 2 }} />
      <FormControlLabel control={<Checkbox checked={dblp} onChange={handleChangeDblp} defaultChecked />} label="DBLP" />
      <FormControlLabel control={<Checkbox checked={elsevier} onChange={handleChangeElsevier} defaultChecked />} label="Elsevier" />
      <FormControlLabel control={<Checkbox checked={googleScholar} onChange={handleChangeGoogleScholar} defaultChecked />} label="Google Scholar" />
    </form>
  )
}

export default SearchBar;