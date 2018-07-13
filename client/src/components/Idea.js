import React, { Component } from 'react';

class Idea extends Component {
  render() {                
    return (
      <div className="card col-4 p-3">
        {this.props.idea.text}
        {/* <button onClick={this.props.onEdit}>Edit</button> */}
        <button onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }
}

export default Idea;
