import React, { Component } from 'react';

class InputText extends Component {
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
        <input type="submit" value="Edit"/>
      </form>
    )
  }
}

export default InputText;
