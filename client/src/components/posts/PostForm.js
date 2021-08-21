import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './PostForm.css'

// redux
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('')
    
    const onSubmit = e => {
        e.preventDefault()
        addPost({ text })
        setText('')
    }

  return (
    <div className="post">
      <form className="post-form" onSubmit={(e) => onSubmit(e)}>
        <textarea
          cols="79"
          rows="4"
          placeholder="what's on your mind?"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="post-button">share</button>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
