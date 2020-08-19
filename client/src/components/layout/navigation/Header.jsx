import React, { Component } from 'react';
import {  BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../../api/apiClient'
import {
  showUser,
} from '../../../api/apiClient';

// This is the navigation component
class Header extends Component {

  state = {
    firstname: '',
    lastname: '',
    username: '',
    photo: ''
  }

  componentDidMount(){
    // Get the user information if the user
    // is authenticated.
    if(isAuthenticated()){
      this.showUserProfile();
    }
  }

  showUserProfile = () => {
    // this methods helps get the user profile
    // information and save it in state
    showUser()
    .then(user => {
      this.setState({
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        photo: user.profile_photo,
      })
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  logOut = () => {
    // handle logout. Once the logout button is clicked
    // the localstorage is cleared and redirected back to login component.
    const { history } = this.props
    localStorage.clear();
    history.push("/login");
  }


  render() {
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link exact='true' to = "/" className="navbar-brand">Gigs</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          { ( isAuthenticated() ) ?
            <li className="nav-item active">
            <a className="nav-link" href="/"><span className="sr-only">(current)</span></a>
          </li> : ''
        }
        </ul>
        { ( isAuthenticated() ) ?
          (
            <>
              <Link exact='true' to = "/profile"><img src={this.state.photo ? this.state.photo : 'https://avatars2.githubusercontent.com/u/12019320?s=460&u=d0e2bdf1be105ea016322ed761da2e195a8d3217&v=4'} className="comment-round-image"/></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={this.logOut} className="btn btn-outline-primary my-2 my-sm-0">Logout</button>
            </>
          ) : ''
        }
      </div>
    </nav>
      </>
    )
  }
}

export default withRouter(Header);
