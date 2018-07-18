import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Comment.css';

class Comment extends Component {
  render() { 
    let deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
    return (
      <div className="comment clearfix">
        {this.props.comment.text}
        <Button outline onClick={this.props.onDelete}>{deleteIcon}</Button>
      </div>
    );
  }
}

export default Comment;
