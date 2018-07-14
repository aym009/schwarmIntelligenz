import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import Idea from './Idea';
import EditProject from './EditProject';
import InputText from './InputText';
import api from '../api';

class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {},
      ideas: [],
      title:"",
      description: "",
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
  handleChange(e){
    console.log("inputName: " + e.target.name + " / value: " + e.target.value)
    this.setState({
      [e.target.getAttribute("name")]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("edit " + this)
    // api.putProject(this.state.project.id, {})
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
  handleTextChange(e){
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

  render() {                
    return (
      <div className="ProjectDetail">
        <h1>{this.state.project.title}</h1>
        <p>{this.state.project.description}</p>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input 
            type="text" 
            name="title"
            value={this.state.project.title} 
            onChange={this.handleChange.bind(this)} 
          />
          <input 
            type="text" 
            name="description"
            value={this.state.project.description} 
            onChange={this.handleChange.bind(this)} 
          />
          <button type="submit">Edit</button>
        </form>

        {/* <EditProject 
          project={this.state.project} 
          onChange={this.handleChange.bind(this)}
          onEdit={this.handleEdit}
        /> */}
        <div className="row">
          {this.state.ideas.map((idea, i) => (
            <Idea 
              key={i} 
              idea={idea} 
              onDelete={()=>this.handleDelete(idea._id)} 
            />
          ))}
        </div>
        <InputText 
          onAdd={this.handleAdd.bind(this)}
          onChange={this.handleTextChange.bind(this)} 
          newText={this.state.newText}
        />
      </div>
    );
  }
}

export default ProjectDetail;