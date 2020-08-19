import React, {Component} from 'react';

// A component that shows comment item
class Comment extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const {comment, commenterPhoto, name } = this.props
    return (
      <div key={comment.id}>
        <div className="card">
          <div className="card-body">
          <div className="article-author">
            <div>
              <img src={commenterPhoto} className="comment-round-image" />
            </div>
            <div className="title-author">
            <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
              {comment.content}
            </div>
          </div>
          </div>
        </div>

        <br />
      </div>
    )
  }
}

export default Comment;
