import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                
    return (
      <div className="Home">
        <div className="inner">
          <h2 className="mb-5">Welcome to <br />Schwarm Intelliganz</h2>
          <Button outline color="primary" href="/signup" className="w-100 mb-3">Signup</Button>
          <Button outline color="primary" href="/login" className="w-100 mb-3">Login</Button>
        </div>
      </div>
    );
  }
}

export default Home;
