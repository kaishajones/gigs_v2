import React, {Component} from 'react';
import './App.css';
import {  BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom';

import ArticleList from './components/layout/ArticleList';
import Register from './components/layout/auth/Register';
import Login from './components/layout/auth/Login';
import ProtectedRoute from './components/layout/auth/ProtectedRoute';
import Profile from './components/layout/auth/Profile';
import Header from './components/layout/navigation/Header';
import NoMatch from './components/layout/NoMatch';
import {isAuthenticated } from './api/apiClient'
import {  createBrowserHistory  } from 'history'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  // Get history object from createBrowserHistory method.
  // Add routes and that maps to components e.g
  // /login route maps to the login component.
  const history = createBrowserHistory();

    return (
      <Router history={history}>
      <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact={true} path='/profile' component={Profile} />
          <ProtectedRoute exact={true} path='/' component={ArticleList} />
          <Route component={NoMatch} />
        </Switch>
        <ToastContainer />
      </Router>
    );

}

export default App;
