import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import Idea from './Idea';
import InputText from './InputText';
import api from '../api';
// import './Sample.css';

class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {},
      ideas: [],
      newText: "new idea"
    }
  }
  componentDidMount() {
    api.getProject(this.props.match.params.id)
      .then(result => {
        this.setState({
          project: result.project,
          ideas: result.ideas,
        })
      })
      .catch(err => console.log(err))
  }
  handleAdd(e){
    e.preventDefault();
    let ideas = this.state.ideas.slice()
    this.setState({
      ideas: [
        ...this.state.ideas, 
        {
          text: this.state.newText, 
          _owner: api.loadUser()
        }
      ],
      newText: ''
    })

    api.postIdea({
      text: this.state.newText, 
      _project: this.props.match.params.id
    })
    .then(data => {
      this.setState({
        ideas: [
          ...ideas, 
          {...data.idea, _owner: api.loadUser()}
        ],
      })
    }) 
  }
  handleChange(e){
    this.setState({
      newText: e.target.value
    })
  }
  handleDelete(id) {
    api.deleteIdea(id)
    .then(data => console.log(data))
    this.setState({
      ideas: this.state.ideas.filter(idea => idea._id !== id)
    })
  }
  handleEdit(id) {
    api.putIdea(id)
    .then(data => console.log(data))
    // this.setState({
    //   ideas: this.state.ideas.filter(idea => idea._id !== id)
    // })
  }
  render() {                
    return (
      <div className="ProjectDetail">
        <h1>ProjectDetail</h1>
        <p>{this.state.project.title}</p>
        {/* <p>{JSON.stringify(this.state.ideas)}</p> */}
        <div className="row">
          {this.state.ideas.map((idea, i) => (
            <Idea 
              key={i} 
              idea={idea} 
              onDelete={()=>this.handleDelete(idea._id)} 
              onEdit={()=>this.handleEdit(idea._id)}
            />
          ))}
        </div>
        <InputText 
          onAdd={this.handleAdd.bind(this)}
          onChange={this.handleChange.bind(this)} 
          newText={this.state.newText}
        />
      </div>
    );
  }
}

export default ProjectDetail;