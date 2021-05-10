import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Loginpage from './pages/Loginpage'
import Mainmenu from './Mainmenu';
import Login from './pages/Login';

const App = () => {
  const data = {
    userId: "",
    name: "",
    email: "",
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Loginpage {...props} />}/>
          <Route path="/main" render={props => <Mainmenu {...props} />}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App
