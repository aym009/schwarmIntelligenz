import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import './CreateProject.css';

class CreateProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: ""
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value
    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.title, this.state.description)
    let data = {
      title: this.state.title,
      description: this.state.description
    }
    api.postProject(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/projects") // Redirect to the projects page
        this.setState({
          title: "",
          description: ""
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => {
        console.log('ERROR')
      })
  }
  render() {                
    return (
      <div className="CreateProject">
        <div className="inner">
          <h2>Create Project</h2>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input 
                type="text" 
                value={this.state.title} 
                onChange={(e) => {this.handleInputChange("title", e)}}
                placeholder="Enter the Project title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input 
                type="textarea" 
                value={this.state.description} 
                onChange={(e) => {this.handleInputChange("description", e)}} 
                placeholder="Describe your project"
              />
            </FormGroup>
            <Button onClick={(e) => this.handleClick(e)}>Create project</Button>
          </Form>
          <div style={{
            margin: 10,
            backgroundColor: "red",
            display: this.state.message ? "block" : "none"
          }}>
            {this.state.message}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProject;
