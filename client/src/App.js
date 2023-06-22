import './App.css';
import React from 'react';
import Homepage from './components/Homepage';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container searchApp">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
