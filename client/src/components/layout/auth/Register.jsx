import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { register } from '../../../api/apiClient';

// This component handle registration of new users
class Register extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '' };
  }

  handleInputChange = (event) => {
    // this gets the email and password from the form
    // and save it in state
    this.setState({[event.target.name]: event.target.value})
  }

  handleRegister = (event) => {
    // this method, handles the registration of a new user
    // After registering, we redirect to the login component
    const {history} = this.props
   event.preventDefault();
   console.log(this.state, "state");

   register(this.state)
   .then(res => this.handleRedirect())
   .catch(err => alert(err));
  }

  handleRedirect = () => {
    // This method handles the redirects
    // and shows the toast messsage
    toast.info("User created successfully!")
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center align-items-center custom-class">
          <div className="col-6">
          <h3>Register</h3>
          <hr />
          <form className="form-signin" onSubmit={this.handleRegister}>
        <div className="form-label-group">
          <label htmlFor="inputEmail">Email address</label>
          <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" required autoFocus
          onChange={this.handleInputChange}
          />
        </div>
        <br />
        <div className="form-label-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required
          onChange={this.handleInputChange}
          />
        </div>
        <br />
        <div className="auth-links">
        <div style={{alignSelf: "center"}}>
          Already registered?&nbsp;<Link to ='/login'>Login</Link>
        </div>
        <div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
        </div>
        </div>
      </form>
          </div>
          </div>
        </div>
    );
  }
 }
 export default Register;
