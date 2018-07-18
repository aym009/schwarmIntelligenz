import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

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
    let editIcon = <FontAwesomeIcon icon={faPencilAlt} />

    return(
      <div>
        <Button outline color="danger" onClick={this.toggle}>{editIcon}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Project</ModalHeader>
          <Form onSubmit={this.props.onEdit}>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input 
                  onChange={this.props.onChange} 
                  value={this.props.project.title} 
                  type="text" 
                  name="title"
                  className="mb-3"
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input 
                  onChange={this.props.onChange} 
                  value={this.props.project.description} 
                  type="text" 
                  name="description"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>Edit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default InputText;
