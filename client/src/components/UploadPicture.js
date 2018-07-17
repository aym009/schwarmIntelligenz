import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class UploadPicture extends Component {
  render(){
    return(
      <Form onSubmit={this.props.onUpload}>
        <FormGroup>
          <Input type="file" onChange={this.props.onChange} />
        </FormGroup>
        <Button type="submit">Upload a picture</Button>
      </Form>
    )
  }
}

export default UploadPicture;
