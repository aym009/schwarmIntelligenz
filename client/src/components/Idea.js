import React, { Component } from 'react';
import InputText from './InputText';
import api from '../api';

class Idea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: this.props.idea._comments,
      newText: "new comment"
    }
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
    api.postComment({
      text: this.state.newText, 
      _idea: this.props.idea._id
    })
    .then(data => {
      console.log(data.comment._id)
      this.setState({
        comments: [
          ...comments, 
          {text: data.comment.text, _owner: data.comment._id}
        ]
      })
    }) 
  }

  render() {                
    return (
      <div className="card col-4 p-3">
        {this.props.idea.text}
        <button onClick={this.props.onDelete}>Delete</button>

        {this.state.comments.map((comment, i) => (
          <div>{comment.text}</div>
        ))}
        <InputText 
          onAdd={this.handleAdd.bind(this)}
          onChange={this.handleTextChange.bind(this)} 
          newText={this.state.newText}
        />

      </div>
    );
  }
}

export default Idea;
