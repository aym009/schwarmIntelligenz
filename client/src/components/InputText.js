import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';

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
        <Button color={this.props.btnColour} onClick={this.toggle}>{this.props.btnText}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.headText}</ModalHeader>
          <Form onSubmit={this.props.onAdd}>
            <ModalBody>
              <FormGroup>
                <Input onChange={this.props.onChange} value={this.props.newText} type="textarea" name="inputText"/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>Add</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default InputText;
