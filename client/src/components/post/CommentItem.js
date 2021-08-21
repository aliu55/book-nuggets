import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const CommentItem = ({ comment: { _id, text, name, avatar, user, date } }) => {
  return (
    <div className="post">
      <div className="post-info">
        <div>
          <img className="post-img" src={avatar} alt="" />
        </div>
        <div>
          <p className="post-user">{name}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
        </div>
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default CommentItem
