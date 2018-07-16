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
      <div>
      <Button color="danger" onClick={this.toggle}>Edit Project</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <form onSubmit={this.props.onEdit}>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>Edit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    )
  }
}

export default InputText;
