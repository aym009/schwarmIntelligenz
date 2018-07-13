import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
// import './Sample.css';

class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {}
    }
  }
  componentDidMount() {
    api.getProject(this.props.match.params.id)
      .then(result => {
        this.setState({
          project: {...result}
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="ProjectDetail">
        <h1>ProjectDetail</h1>
        <p>{this.state.project.title}</p>
      </div>
    );
  }
}

export default ProjectDetail;