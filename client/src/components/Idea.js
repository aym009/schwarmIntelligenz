import React, { Component } from 'react';
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
    console.log(this.state.idea._id)
    api.getComments(this.state.idea._id)
    .then(result => {
      // console.log("result" + result)
      this.setState({ 
        comments: result.comments 
      })
    })
  }
  render() {                
    return (
      <div className="card col-4 p-3">
        {this.state.idea.text}
        {/* <button onClick={this.props.onEdit}>Edit</button> */}
        <button onClick={this.props.onDelete}>Delete</button>
      </div>
    );
  }
}

export default Idea;
