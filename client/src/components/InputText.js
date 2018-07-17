import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class InputText extends Component {
  render(){
    console.log('Im inside the input text')
    return(
      <Form onSubmit={this.props.onAdd}>
        <FormGroup>
          <Input onChange={this.props.onChange} value={this.props.newText} type="textarea" name="inputText"/>
          <Button type="submit">Add</Button>
        </FormGroup>
      </Form>
    )
  }
}

export default InputText;
