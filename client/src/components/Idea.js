import React, { Component } from 'react';
import Comment from './Comment';
import InputText from './InputText';
import { Button, Col } from 'reactstrap';
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
    // console.log("comments",comments)
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
    // console.log("this.state.comments",this.state.comments)
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

  handleDelete(id) {
    api.deleteComment(id)
    .then(data => console.log(data))
    this.setState({
      comments: this.state.comments.filter(comment => comment._id !== id)
    })
  }

  render() { 
 
    return (
      <Col xs={12} md={6} lg={4} className="p-3 card">
        {this.props.idea.text}
        <Button onClick={this.props.onDelete}>Delete</Button>

        {this.state.comments && this.state.comments.map((comment, i) => (
          <Comment 
              key={i} 
              comment={comment} 
              onDelete={()=>this.handleDelete(comment._id)} 
            />
        ))}
        <InputText 
          onAdd={this.handleAdd.bind(this)}
          onChange={this.handleTextChange.bind(this)} 
          newText={this.state.newText}
        />

      </Col>
    );
  }
}

export default Idea;
