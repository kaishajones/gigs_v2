import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../../api/apiClient';
import { isAuthenticated } from '../../../api/apiClient';
import { toast } from 'react-toastify';


// This component handles the login flow for registered users

class Login extends Component {
 constructor(props) {
 super(props);
 this.state = { name: '', password: '' };
 }

 handleInputChange = (event) => {
   // get parameters from the form and hold it in state
  this.setState({[event.target.name]: event.target.value})
}

handleLogin = (event) => {
// handle user login and redirect to the articlelist component
// prevents the form from refreshing
 event.preventDefault();


 login(this.state)
 .then(res => this.handleRedirect() )
 .catch(err => alert(err));
}

  
handleRedirect = () => {
  // handles the redirect and showing of the notification
  // history particular part of state
  // source: TOASTIFY https://www.youtube.com/watch?v=VdVGPov7Yqc
  toast.info("User logged in successfully!")
  const { history } = this.props
  history.push('/')
}

render() {

 return (
  <div className="container">
  <div className="row justify-content-center align-items-center custom-class">
  <div className="col-6">
  <h3>Login</h3>
  <hr />
  <form className="form-signin" onSubmit={this.handleLogin}>
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
  New member?&nbsp;<Link to ='/register'>Register</Link>
</div>
<div>
  <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
</div>
</div>
</form>
  </div>
  </div>
</div>
 );
 }
 }
 export default Login;
