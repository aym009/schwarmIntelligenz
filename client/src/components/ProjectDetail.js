import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import EditProject from './EditProject';
import Idea from './Idea';
import InputText from './InputText';
import UploadPicture from './UploadPicture';
import api from '../api';
import { Container, Row } from 'reactstrap'
// import './Sample.css';

class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {},
      ideas: [],
      title: "",
      description: "",
      newText: "",
      file: null
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

  handleChange(e) {
    // console.log("INPUT NAME: " + e.target.name + " / VALUE: " + e.target.value)
    let newProject = {...this.state.project}
    newProject[e.target.name] =  e.target.value
    this.setState({
      project: newProject
    })
  }
  handleEdit(e) {
    e.preventDefault()
    console.log("submission for " + this.state.project.title)
    let data = {
      title: this.state.project.title,
      description: this.state.project.description
    }
    api.putProject(this.state.project._id, data)
    .then(_ => {
      console.log('SUCCESS!')
      this.setState({
        title: '',
        description: ''
      })
    })
    .catch(err => {
      console.log('ERROR')
    })
  }

  handleTextChange(e){
    this.setState({
      newText: e.target.value
    })
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
  
  handlePicChange(e){
    // console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }
  handleUpload(e) {
    e.preventDefault()    
    api.addPicture(this.state.file, 
      this.props.match.params.id
    )
    .then(data => {
      // console.log("data: ", data.data)
      this.setState({
        ideas: [
          ...this.state.ideas, 
          {pictureUrl: data.data.pictureUrl, _project: data.data._id}
        ],
      })
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

        <EditProject 
          project={this.state.project}
          onEdit={this.handleEdit.bind(this)}
          onChange={this.handleChange.bind(this)} 
        />
        <Container>
        <Row>
          {this.state.ideas.map((idea, i) => (
            <Idea 
              key={i} 
              idea={idea} 
              onDelete={()=>this.handleDelete(idea._id)} 
            />
          ))}
        </Row>
        </Container>

        <InputText 
          onAdd={this.handleAdd.bind(this)}
          onChange={this.handleTextChange.bind(this)} 
          newText={this.state.newText}
        />

        <UploadPicture 
          onUpload={this.handleUpload.bind(this)}
          onChange={this.handlePicChange.bind(this)} 
        />
      </div>
    );
  }
}

export default ProjectDetail;