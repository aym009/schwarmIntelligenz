import React, { Component } from 'react';
import EditProject from './EditProject';
import Idea from './Idea';
import InputText from './InputText';
import UploadPicture from './UploadPicture';
import api from '../api';
import { Tooltip } from 'reactstrap'
import './ProjectDetail.css';

class ProjectDetail extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      project: {},
      ideas: [],
      title: "",
      description: "",
      newText: "",
      file: null,
      tooltipOpen: false
    };
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

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {                
    return (
      <div className="ProjectDetail">
        <div className="text-center pt-3 mb-5">
          <h2>
            {this.state.project.title}
            <EditProject 
              project={this.state.project}
              onEdit={this.handleEdit.bind(this)}
              onChange={this.handleChange.bind(this)} 
            />
          </h2>
          <p>{this.state.project.description}</p>
        </div>

        <div className="ideaWrap">
          <div className="btnBox">
            <em>Add<br />Idea</em>
            <span id="TextIdea">
              <InputText 
                onAdd={this.handleAdd.bind(this)}
                onChange={this.handleTextChange.bind(this)} 
                newText={this.state.newText}
                btnText="T"
                headText="Add Idea"
                btnColour="secondary"
              />
            </span>
            <Tooltip placement="right" isOpen={this.state.tooltip01} target="TextIdea" toggle={() => { this.setState({ tooltip01: !this.state.tooltip01 })}}>
              Add text
            </Tooltip>

            <span id="PictureIdea">
              <UploadPicture 
                onUpload={this.handleUpload.bind(this)}
                onChange={this.handlePicChange.bind(this)} 
              />
            </span>
            <Tooltip placement="right" isOpen={this.state.tooltip02} target="PictureIdea" toggle={() => { this.setState({ tooltip02: !this.state.tooltip02 })}}>
              Add a picture
            </Tooltip>
          </div>

          <div className="row">
            {this.state.ideas.map((idea, i) => (
              <Idea 
                key={i} 
                idea={idea} 
                onDelete={()=>this.handleDelete(idea._id)} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDetail;