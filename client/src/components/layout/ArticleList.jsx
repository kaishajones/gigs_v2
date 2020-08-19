import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {
  listArticles,
  createArticle,
  isAuthenticated,
  createComment,
  editArticle,
  showArticle,
  deleteArticle
} from '../../api/apiClient';

import Comment from './Comment';

// This components does the following:
// - Allows users to create a new article
// - Allows users to edit an article
// - Allows users to list all created articles and associated comments
// - Allow users to comment on an article
// - Allow users to view all comments in an article.
class ArticleList extends Component {
  constructor() {
  super();
    this.state = {
      articles: [],
      title: '',
      content: '',
      commentContent: '',
      showComments: {},
      isEditing: false,
      articleId: undefined,
      showCommentBox: {}
    };
  }

  componentDidMount() {
    // On component mount get all articles
    this.displayArticles();
  }

  displayArticles = () => {
    // Method that allows users to get all article created
    // across different users
    const userId = localStorage.getItem('userId');
    listArticles(userId)
    .then(articles => {
      this.setState({articles})
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  handleInputChange = (event) => {
    // Get the title and content from the form as a parameter
    // and save in state.
    this.setState({[event.target.name]: event.target.value})
  }

  handleCreateArticle = (event) => {
    // This method creates a new article
    event.preventDefault();
    const data = {
      title: this.state.title,
      content: this.state.content,
    };
    createArticle(data)
    .then(res => {
      this.displayArticles();
      this.setState({ title: '', content: '' })
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  handleCommentInput = (event, articleId) => {
    // This method shows the comment box to add a comment
    event.preventDefault();
    this.setState({showCommentBox: {[articleId]: !this.state.showCommentBox[articleId]}})
  }

  handleHideCommentBox = (event, articleId) => {
    // This method shows hides the comment box after adding a comment
    event.preventDefault();
    this.setState({showCommentBox: {[articleId]: !this.state.showCommentBox[articleId]}})
  }

  handleShowComment = (event, articleId) => {
    // This method shows all the comments for an article
    event.preventDefault();
    this.setState({showComments: {[articleId]: !this.state.showComments[articleId]}})
  }

  handleHideComment = (event, articleId) => {
    // This method hides all the comments for an article
    event.preventDefault();
    this.setState({showComments: {[articleId]: !this.state.showComments[articleId]}})
  }

  handleCreateComment = (articleId, event) => {
    // This method creates a new comment
    event.preventDefault();
    const data = {
      content: this.state.commentContent
    }
    createComment(articleId, data)
    .then(res => {
      this.displayArticles();
      this.setState({
        showCommentBox: {[articleId]: !this.state.showCommentBox[articleId]},
        commentContent: '',
      })
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  handleEditArticle = (event, articleId) => {
    // This method edits an article
    event.preventDefault();
    const data = {
      title: this.state.title,
      content: this.state.content
    }
    editArticle(articleId, data)
    .then(res => {
      this.displayArticles();
      this.setState({isEditing: false, title: '', content: '' })
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  handleShowArticle = (articleId, event) => {
    // This method shows an article. Used during edit
    this.setState({
      isEditing: true
    });
    event.preventDefault();
    showArticle(articleId)
    .then(article => {
      console.log(article, "article");
      this.displayArticles();
      this.setState({
        title: article.title,
        content: article.content,
        articleId: article.id,
        isEditing: true
      })
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  handleDeleteArticle = (articleId, event) => {
    // This method delete an article
    event.preventDefault();
    deleteArticle(articleId)
    .then(res => {
      this.displayArticles();
    })
    .catch(err =>  console.log('User Not Authenticated'));
  }

  render() {
    // If the user is not authenticated, redirect to the login screen
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }
    // getting the articles
    // arrange them by the latest 
    const { articles } = this.state;
    const orderArticles = articles.sort((a, b) => (a.id < b.id) ? 1 : -1)
    return (
      <div className="container">
        <div className="row" style={{marginTop: '2%'}}>
          <div className="col">
          <form onSubmit={(evt) => this.state.isEditing ? this.handleEditArticle(evt, this.state.articleId) : this.handleCreateArticle(evt)}>
            <div className="form-group">
              <input type="text" name="title" value={this.state.title} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" required
              onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <textarea className="form-control" value={this.state.content} name="content" id="exampleFormControlTextarea1" placeholder="Article content" rows="3" required
                onChange={this.handleInputChange}></textarea>
            </div>
            <div className="text-right">
              {
                this.state.isEditing ? (
                  <button type='submit' className="btn btn-primary">Edit Article</button>
                ) : (
                  <button type='submit' className="btn btn-primary">Add Article</button>
                )
              }

            </div>
          </form>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <br />
            {
              orderArticles.length === 0 && (
                <h3>No Articles to display!</h3>
              )
            }
            {
              // mapping through the created article list and displaying them one after the other
              orderArticles.map((article) => {
                const name = article.user.firstname && article.user.lastname ? `${article.user.firstname} ${article.user.lastname}` : "User Name";
                const photo = article.user.profile_photo ? article.user.profile_photo : 'https://avatars2.githubusercontent.com/u/12019320?s=460&u=d0e2bdf1be105ea016322ed761da2e195a8d3217&v=4';
                const commentCount = article && article.comments && article.comments.length <= 1 ? `${article.comments.length} comment` : `${article.comments.length} comments`
                const userId = localStorage.getItem('userId');
                const showActionButton = userId == article.user.id;
                return (
                <div key={article.id}>
                <div className="card">
                  <div className="card-body">
                    <div className="card-top-styles">
                      <div className="article-author">
                        <div>
                          <img src={photo} className="round-image"/>
                        </div>
                        <div className="title-author">
                        <h5 className="card-title">{article.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
                        </div>
                      </div>
                      <div className="card-action-buttons">
                        { showActionButton ? (
                          <>
                          <button className="btn btn-primary" type="button"
                            onClick={(evt) => this.handleShowArticle(article.id, evt)}>Edit</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <button className="btn btn-danger" type="button"
                            onClick={(evt) => window.confirm("Are you sure you want to delete this article?") &&  this.handleDeleteArticle(article.id, evt)}
                            >Delete</button>
                          </>
                        ) : null

                        }

                      </div>
                    </div>
                    <br />
                    <p className="card-text">{article.content}</p>
                    {
                      this.state.showCommentBox[article.id] ? (
                        <form onSubmit={(evt) => this.handleCreateComment(article.id, evt)}>
                          <div className="form-group">
                            <textarea className="form-control" value={this.state.commentContent} name="commentContent" id="exampleFormControlTextarea1" placeholder="Comment content" rows="3" required
                              onChange={this.handleInputChange}></textarea>
                          </div>
                          <div className="text-right">
                            <button onClick={(evt) => this.handleHideCommentBox(evt, article.id)} className="btn">Cancel</button>
                            <button type='submit' className="btn btn-primary">Add Comment</button>
                          </div>
                        </form>
                      ): (
                        <span>
                          <a onClick={(evt) => this.handleCommentInput(evt, article.id)} className="card-link custom-card-link">Add comment</a>
                          <a onClick={(evt) => this.handleShowComment(evt, article.id)} className="card-link custom-card-link">{commentCount}</a>
                        </span>
                      )
                        }
                        {
                          <span>
                        <hr />
                   
                        <br />
                        <div style={{width: '90%', marginLeft: '9.9%'}}>
                        {article.comments.sort((a, b) => (a.id < b.id) ? 1 : -1).map((comment) => {
                          const commenterPhoto = comment.user.profile_photo ? comment.user.profile_photo : 'https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png';
                          const name = comment.user.firstname && comment.user.lastname ? `${comment.user.firstname} ${comment.user.lastname}` : "Commentor Name";
                          return (
                            <Comment
                              comment={comment}
                              commenterPhoto={commenterPhoto}
                              name={name}
                            />
                        )})}
                        </div>
                        </span>
                        }

                  </div>
                </div>
                <br />
                </div>
              )})
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleList;
