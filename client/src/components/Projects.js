import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import api from '../api';
import './Projects.css';

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
        <div>
          <h2 className="mb-4">Projects</h2>
          <ListGroup flush>
            {this.state.projects.map((project, i) => (
              <ListGroupItem tag="a" href={"/project/" + project._id}>{project.title}</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default Projects;