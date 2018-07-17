import React, { Component } from 'react';

class Comment extends Component {
  render() { 
    return (
      <div>
        {this.props.comment.text}
        <button onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }
}

export default Comment;
