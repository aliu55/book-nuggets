import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './PostItem.css'

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import {
  faComment,
  faHeart as farHeart,
} from '@fortawesome/free-regular-svg-icons'

// redux
import { connect } from 'react-redux'
import { addLike, removeLike } from '../../actions/post'

// components
import Moment from 'react-moment'

const PostItem = ({ addLike, removeLike, post, auth, showActions }) => {
  const { _id, text, name, avatar, likes, comments, date } = post

  const changeLike = () => {
    hasLiked() ? removeLike(_id) : addLike(_id)
  }

  const hasLiked = () => {
    return likes.filter((like) => like.user === auth.user._id).length > 0
  }

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
        <button className="post-actions" onClick={(e) => changeLike()}>
          <FontAwesomeIcon
            icon={hasLiked() ? fasHeart : farHeart}
            className="post-icon"
          />{' '}
          <span>{likes.length}</span>
        </button>

        <Link to={`/community/${_id}`} className="post-actions comment">
          <FontAwesomeIcon icon={faComment} className="post-icon" />{' '}
          <span>{comments.length}</span>
        </Link>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { addLike, removeLike })(PostItem)
