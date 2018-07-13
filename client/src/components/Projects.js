import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import ProjectDetail from './ProjectDetail';
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
        <ul>
          {this.state.projects.map((project, i) => (
            <li><Link to={"/project/" + project._id} key={i}>{project.title}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Projects;