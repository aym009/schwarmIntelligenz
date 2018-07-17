import React, { Component } from 'react';
import InputText from './InputText';
import { Button } from 'reactstrap';
import api from '../api';

class Idea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: this.props.idea._comments || [],
      newText: "new comment"
    }
    console.log(this.props.idea._comments)
  }

  handleTextChange(e){
    this.setState({
      newText: e.target.value
    })
  }

  handleAdd(e){
    console.log("come on handleadd")
    e.preventDefault();
    
       let comments = this.state.comments.slice()
      console.log("comments",comments)
    

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
    console.log("this.state.comments",this.state.comments)

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
        <Button onClick={this.props.onDelete}>Delete</Button>

        {this.state.comments && this.state.comments.map((comment, i) => (
          <div key={i}>{comment.text}</div>
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
