import axios from 'axios';
import { BASE_URL } from './baseUrl'

// This is the register method that handles registration. It connects
// The register component with register endpoint from the server and return
// The response

export const register = (data) => {
  return axios.post(`${BASE_URL}/api/v1/users`, {email: data.email, password: data.password})
  .then(response => console.log(response.data) || response.data)
  .catch(err => console.log(err));
}

// This is the login method that handles user login. It connects
// The login component with login endpoint from the server and return
// The response. Part of the response is the token that is save in localstorage
// for authorization

export const login = (data) => {
  return axios.post(`${BASE_URL}/api/v1/login`, {email: data.email, password: data.password})
  .then(response => {
    console.log(response.data)
    localStorage.setItem('accessToken', response.data.token)
    localStorage.setItem('userId', response.data.user.id)
    localStorage.setItem('accessToken-expiration', Date.now() + 24 * 60 * 60 * 1000);
    return response.data
  })
  .catch(err => console.log(err));
}

// The exposes the show user endpoint and return the user information
export const showUser = () => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { Authorization: `Bearer ${token}` } ;
  return axios.get(`${BASE_URL}/api/v1/users/${userId}`, {"headers": headers} )
  .then(response => {
    return response.data
  })
  .catch(err => console.log(err));
}

//This exposes the edit profile endpoint and allows users to edit their profile
export const editProfile = (data) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { Authorization: `Bearer ${token}` } ;
  return axios.put(`${BASE_URL}/api/v1/users/${userId}`, data, {"headers": headers} )
  .then(response => {
    return response.data
  })
  .catch(err => console.log(err));
}

// This exposes the endpoint to list all articles, This interacts with the article
// list component.
export const listArticles = (user_id) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${BASE_URL}/api/v1/users/${userId}/articles`, headers )
  .then(response => {
    return response.data
  })
  .catch(err => console.log(err));
}

// This exposes the edit article endpoint and allow uses to edited an existing article

export const editArticle = (articleId, data) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { Authorization: `Bearer ${token}` } ;
  return axios.put(`${BASE_URL}/api/v1/users/${userId}/articles/${articleId}`, data, {"headers": headers} )
  .then(response => {
    console.log(response.data);
    return response.data
  })
  .catch(err => console.log(err));
}

// This exposes the show article endpoint, and allow users to see just a particular
// article. It also used along side the edit article endpoint.

export const showArticle = (articleId) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { Authorization: `Bearer ${token}` } ;
  return axios.get(`${BASE_URL}/api/v1/users/${userId}/articles/${articleId}`, {"headers": headers} )
  .then(response => {
    return response.data
  })
  .catch(err => console.log(err));
}

// This allows users to delete an article by clicking on the delete icon on an article item.
export const deleteArticle = (articleId) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { Authorization: `Bearer ${token}` } ;
  return axios.delete(`${BASE_URL}/api/v1/users/${userId}/articles/${articleId}`, {"headers": headers} )
  .then(response => {
    return response.data
  })
  .catch(err => console.log(err));
}

// This exposes the create article endpoint and allow users to create
// new articles from the form in the article list component.
export const createArticle = (data) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { Authorization: `Bearer ${token}` } ;

  return axios.post(`${BASE_URL}/api/v1/users/${userId}/articles`, data, {"headers": headers} )
  .then(response => {
    console.log(response.data, "new article");
    return response.data
  })
  .catch(err => console.log(err));
}

// this exposes the create comment endpoint and allow users
// to create a new comment for an article

export const createComment = (articleId, data) => {
  const token = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const headers = { Authorization: `Bearer ${token}` } ;

  return axios.post(`${BASE_URL}/api/v1/users/${userId}/articles/${articleId}/comments`, data, {"headers": headers} )
  .then(response => {
    console.log(response.data, "new comment");
    return response.data
  })
  .catch(err => console.log(err));
}

// This function checks if a user is authenticated.
export const isAuthenticated = () => {
  return localStorage.getItem('accessToken') && localStorage.getItem('accessToken-expiration') > Date.now()
}
