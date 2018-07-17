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
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Login container">
        <h2>Login</h2>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} /> <br/>
            <Label for="password">Password</Label>
            <Input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}}  /> <br/>
            <Button onClick={(e) => this.handleClick(e)}>Login</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;
