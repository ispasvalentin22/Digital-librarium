import './App.css';
import React from 'react';
import Article from './components/Article';
import Homepage from './components/Homepage';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container searchApp">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
