import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import CreateProject from './CreateProject';
import ProjectDetail from './ProjectDetail';
import Login from './Login';
import Signup from './Signup';
import api from '../api';
import './App.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      countries: [],
      isOpen: false
    }
    api.loadUser();
  }

  componentDidMount(){
    document.title = "Schwarm Intelligenz"
  }

  handleLogoutClick(e) {
    api.logout()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {                
    return (
      <div className="App">
        <Navbar light expand="md">
          <div className="container">
            { api.isLoggedIn() && <NavbarBrand href="/projects"><h1>Schwarm Intelligenz</h1></NavbarBrand> }
            { !api.isLoggedIn() && <NavbarBrand><h1>Schwarm Intelligenz</h1></NavbarBrand> }
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  { api.isLoggedIn() && <NavLink href="/projects">Projects</NavLink> }
                </NavItem>
                <NavItem>
                  { api.isLoggedIn() && <NavLink href="/create-project">Create Project</NavLink> }
                </NavItem>
                <NavItem>
                  { !api.isLoggedIn() && <NavLink href="/signup">Signup</NavLink> }
                </NavItem>
                <NavItem>
                  { !api.isLoggedIn() && <NavLink href="/login">Login</NavLink> }
                </NavItem>
                <NavItem>
                  { api.isLoggedIn() && <NavLink href="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink> }
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/create-project" component={CreateProject} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/project/:id" component={ProjectDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
