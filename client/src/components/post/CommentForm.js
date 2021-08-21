import React, { useState } from 'react'
import PropTypes from 'prop-types'

// redux
import { addComment } from '../../actions/post'
import { connect } from 'react-redux'

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addComment(postId, { text })
    setText('')
  }

  return (
    <div className="post">
      <form className="post-form" onSubmit={(e) => onSubmit(e)}>
        <textarea
          cols="79"
          rows="2"
          placeholder="write a comment..."
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="post-button">
          comment
        </button>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)
