import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
  
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/projects") // Redirect to the projects page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Login">
        <div className="inner">
          <h2 className="text-center">Login</h2>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}}  /> <br/>
            </FormGroup>
            <div className="text-center">
              <Button onClick={(e) => this.handleClick(e)}>Login</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
