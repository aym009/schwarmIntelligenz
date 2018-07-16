import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
// import './AddCountry.css';


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
        <h2>Create Project</h2>
        <form>
          Title: <input type="text" value={this.state.title} onChange={(e) => {this.handleInputChange("title", e)}} /> <br/>
          Description <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => {this.handleInputChange("description", e)}} ></textarea> <br/>
          <button onClick={(e) => this.handleClick(e)}>Create project</button>
        </form>
        <div style={{
          margin: 10,
          backgroundColor: "red",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default CreateProject;
