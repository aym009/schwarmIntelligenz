import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class InputText extends Component {
  render(){
    // console.log('Im inside the input text')
    return(
      <Form onSubmit={this.props.onAdd}>
        <FormGroup>
          <Input onChange={this.props.onChange} value={this.props.newText} type="textarea" name="inputText"/>
        </FormGroup>
        <Button type="submit">Add</Button>
      </Form>
    )
  }
}

export default InputText;
