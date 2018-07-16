import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render(){
    return(
      <form onSubmit={this.props.onEdit}>
        <input 
          onChange={this.props.onChange} 
          value={this.props.project.title} 
          type="text" 
          name="title"
        />
        <input 
          onChange={this.props.onChange} 
          value={this.props.project.description} 
          type="text" 
          name="description"
        />
        <button type="submit">Edit</button>
      </form>
    )
  }
}

export default InputText;
