import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
    <div className="App">
      <div>
        Hello World
      </div>
    </div>
  );
}

export default App
