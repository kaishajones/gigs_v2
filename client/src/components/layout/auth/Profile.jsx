import React, {Component} from 'react'
import { toast } from 'react-toastify';
import {
  showUser,
  editProfile,
} from '../../../api/apiClient';

// This component is shows and update users profile information
class Profile extends Component {
  constructor() {
    super();
      this.state = {
        firstname: '',
        lastname: '',
        username: '',
      };
    }

  componentDidMount(){
    // on component mount, get the user information
    this.showUserProfile();
  }

  handleInputChange = (event) => {
    // Get the user information from the profile form and hold it in state
    this.setState({[event.target.name]: event.target.value})
  }

  showUserProfile = () => {
    showUser()
    .then(user => {
      this.setState({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        username: user.username || '',
      })
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  handleProfileUpdate = (event) => {
    // handle profile update
    event.preventDefault()
    editProfile(this.state)
    .then(res => this.handleNotification())
    .catch(err =>  console.log('User Not Authenticated'));
  }


  handleNotification = () => {
    // shows notification after update is complete
    this.showUserProfile();
    toast.info("User profile updated successfully!");
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col" style={{marginTop: '2%'}}>
          <div className="card">
            <div className="card-body">
              <h3>Update Profile</h3>
              <br />
              <form onSubmit={this.handleProfileUpdate}>
              <div className="form-group form-padding">
                <label htmlFor="exampleInputEmail1">First Name</label>
                <input type="text" name="firstname" value={this.state.firstname} className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={this.handleInputChange} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="exampleInputEmail1">Last Name</label>
                <input type="text" name="lastname" value={this.state.lastname} className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={this.handleInputChange} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="exampleInputEmail1">User Name</label>
                <input type="text" name="username" value={this.state.username} className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={this.handleInputChange} />
              </div>
              <div className="text-right">
                <button type='submit' className="btn btn-primary btn-lg">Update Profile</button>
              </div>
            </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
