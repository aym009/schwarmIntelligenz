import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
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
        <Navbar color="light" light expand="md">
          <div className="container">
            <NavbarBrand href="/">Ironhack Project 3</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink> 
                </NavItem>
                <NavItem>
                  <NavLink href="/projects">Projects</NavLink> 
                </NavItem>
                <NavItem>
                  {!api.isLoggedIn() && <NavLink href="/signup">Signup</NavLink> }
                </NavItem>
                <NavItem>
                  {!api.isLoggedIn() && <NavLink href="/login">Login</NavLink> }
                </NavItem>
                <NavItem>
                  {api.isLoggedIn() && <NavLink href="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</NavLink> }
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/project/:id" component={ProjectDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        {/* <Button color="primary">Primary Button</Button> */}
      </div>
    );
  }
}

export default App;
