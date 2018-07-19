import React, { Component } from 'react';
import Comment from './Comment';
import InputText from './InputText';
import { Button, Col, CardImg } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import api from '../api';
import './Idea.css';

class Idea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: this.props.idea._comments || [],
      newText: ""
    }
    // console.log(this.props.idea._comments)
  }

  //Add comment
  handleTextChange(e){
    this.setState({
      newText: e.target.value
    })
  }
  handleAdd(e){
    // console.log("come on handleadd")
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

  //Delete comment
  handleDelete(id) {
    api.deleteComment(id)
    .then(data => console.log(data))
    this.setState({
      comments: this.state.comments.filter(comment => comment._id !== id)
    })
  }

  render() {
    let deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
    let addIcon = <FontAwesomeIcon icon={faPlus} />;

    // display idea content depends on text or picture
    let ideaCont
    if (this.props.idea.text) 
      ideaCont = <h5>{this.props.idea.text}</h5>;
    else 
      ideaCont = <CardImg src={this.props.idea.pictureUrl} />;

    return (
      <Col xs="12" sm="6" md="4">
        <div className="ideaCard">
          <div className="ideaCardHead">
            <Button onClick={this.props.onDelete}>{deleteIcon}</Button>
            {ideaCont}
          </div>

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
            btnText="Add Comment"
            headText="Add Comment"
            btnColour="danger"
          />
        </div>
      </Col>
    );
  }
}

export default Idea;
