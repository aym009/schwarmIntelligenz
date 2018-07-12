import React, { Component } from 'react';
import api from '../api';

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }
  componentDidMount() {
    api.getProjects()
      .then(projects => {
        console.log(projects)
        this.setState({
          projects: projects
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="Projects">
        <h2>List of projects</h2>
        {this.state.projects.map((c, i) => <li key={i}>{c.title}</li>)}
      </div>
    );
  }
}

export default Projects;