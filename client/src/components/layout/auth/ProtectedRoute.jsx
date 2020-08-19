import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../../api/apiClient';

// Handles protected routes and redirects to login if user is not
// authenticated.

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
      isAuthenticated()
          ? <Component {...props} />
          : <Redirect to='/login' />
  )} />
)

export default ProtectedRoute;
