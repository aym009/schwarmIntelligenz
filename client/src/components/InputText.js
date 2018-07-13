import React, { Component } from 'react';

class InputText extends Component {
  render(){
    return(
      <form onSubmit={this.props.onAdd}>
        <input onChange={this.props.onChange} value={this.props.newText} type="text" name="inputText"/>
        <input type="submit" value="Add"/>
      </form>
    )
  }
}

export default InputText;
