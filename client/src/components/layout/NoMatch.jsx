import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// A component that shows when a user enters a wrong route.
class NoMatch extends Component {
  render(){
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center custom-class">
          <div className="col-12 text-center">
          <h2>Oops! I believe you are in a wrong place. Don't worry</h2>
          <br />
            <div>
              <Link to="/">
                <button className="btn btn-primary">Go Home</button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default NoMatch;
