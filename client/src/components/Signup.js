import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
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
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {   
    return (
      <div className="Signup">
        <div className="inner">
          <h2 className="text-center">Signup</h2>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="text" value={this.state.email} onChange={(e) => {this.handleInputChange("email", e)}} className="mb-5" />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" value={this.state.name} onChange={(e) => {this.handleInputChange("name", e)}} className="mb-5" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" value={this.state.password} onChange={(e) => {this.handleInputChange("password", e)}} className="mb-5"  />
            </FormGroup>
            <div className="text-center">
              <Button onClick={(e) => this.handleClick(e)}>Signup</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signup;
