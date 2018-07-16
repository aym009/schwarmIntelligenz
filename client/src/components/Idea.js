import React, { Component } from 'react';
import InputText from './InputText';
import api from '../api';

class Idea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idea: this.props.idea,
      comments: []
    }
  }
  componentDidMount() {
    // console.log(this.state.idea._id)
    api.getComments(this.state.idea._id)
    .then(result => {
      // console.log("result" + result)
      this.setState({ 
        comments: result.comments 
      })
    })
  }

  handleTextChange(e){
    this.setState({
      newText: e.target.value
    })
  }
  handleAdd(e){
    e.preventDefault();
    let comments = this.state.comments.slice()
    this.setState({
      comments: [
        ...this.state.comments, 
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
        comments: [
          ...comments, 
          {...data.comment, _owner: api.loadUser()}
        ],
      })
    }) 
  }

  render() {                
    return (
      <div className="card col-4 p-3">
        {this.state.idea.text}
        <button onClick={this.props.onDelete}>Delete</button>

        {/* <InputText 
          onAdd={this.handleAdd.bind(this)}
          onChange={this.handleTextChange.bind(this)} 
          newText={this.state.newText}
        /> */}
      </div>
    );
  }
}

export default Idea;
