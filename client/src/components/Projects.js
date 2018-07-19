import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
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

  //Delete project
  handleDelete(id) {
    api.deleteProject(id)
    .then(data => console.log(data))
    this.setState({
      projects: this.state.projects.filter(project => project._id !== id)
    })
  }
  
  render() {                
    let deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;

return (
      <div className="Projects">
        <div>
          <h2 className="mb-4">Projects</h2>
          <ListGroup flush>
            {this.state.projects.map((project, i) => (
              <ListGroupItem>
              <Link to={"/project/" + project._id} key={i}>{project.title}</Link>
                <button onClick={()=>this.handleDelete(project._id)}>{deleteIcon}</button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default Projects;