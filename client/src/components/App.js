import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Countries from './Countries';
import Projects from './Projects';
import Secret from './Secret';
import Login from './Login';
import Signup from './Signup';
import api from '../api';
import logo from '../logo.svg';
import './App.css';
import { Button } from 'reactstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {                
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Countries</h1>
          <Link to="/">Home</Link> 
          <Link to="/countries">Countries</Link> 
          <Link to="/projects">Projects</Link> 
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }
          <Link to="/secret">Secret</Link> 
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/countries" component={Countries} />
          <Route path="/projects" component={Projects} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <Button color="primary">Primary Button</Button>
      </div>
    );
  }
}

export default App;
