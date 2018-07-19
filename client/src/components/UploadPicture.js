import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

class UploadPicture extends Component {
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
    let pictureIcon = <FontAwesomeIcon icon={faImage} />

    return(
      <div>
        <Button color="danger" onClick={this.toggle}>{pictureIcon}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Upload Picture</ModalHeader>
          <Form onSubmit={this.props.onUpload}>
            <ModalBody>
              <FormGroup>
                <Input type="file" onChange={this.props.onChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>Upload the picture</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default UploadPicture;
