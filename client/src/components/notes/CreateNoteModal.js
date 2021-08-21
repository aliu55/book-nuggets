import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import './CreateNoteModal.css'

// redux
import { addNote } from '../../actions/book'
import { connect } from 'react-redux'

const CreateNoteModal = ({ onCancel, onCreate, addNote, bookId }) => {
  const [type, setType] = useState('')
  const [text, setText] = useState('')
  const [characterCount, setCharacterCount] = useState(0)

  const onChange = (e) => {
    setText(e.target.value)
    setCharacterCount(e.target.value.length)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    addNote(bookId, { type, text })
    onCreate()
    setText('')
    setType('')
  }

  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="post modal-center">
        <form className="post-form" onSubmit={(e) => onSubmit(e)}>
          <textarea
            cols="79"
            rows="4"
            placeholder="start typing your nugget here..."
            name="text"
            value={text}
            onChange={(e) => onChange(e)}
            maxLength="300"
            required
          ></textarea>
          <p className="character-count">{characterCount}/300 </p>

          <p className="type-text">select the type of your nugget...</p>

          {/* radio buttons */}
          <div className="radio-options">
            <div className="radio">
              <input
                id="radio-1"
                name="radio"
                type="radio"
                value="insight"
                onChange={(e) => setType(e.target.value)}
                required
              />
              <label htmlFor="radio-1" className="radio-label">
                insight
              </label>
            </div>

            <div className="radio">
              <input
                id="radio-2"
                name="radio"
                type="radio"
                value="quote"
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="radio-2" className="radio-label">
                quote
              </label>
            </div>

            <div className="radio">
              <input
                id="radio-3"
                name="radio"
                type="radio"
                value="question"
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor="radio-3" className="radio-label">
                question
              </label>
            </div>
          </div>

          {/* add and cancel buttons */}
          <div className="book-form">
            <input type="submit" value="add" className="book-btn btn-success" />

            <button
              type="button"
              onClick={onCancel}
              className="book-btn btn-danger"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

CreateNoteModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  //   bookId: PropTypes.number.isRequired,
}

export default connect(null, { addNote })(CreateNoteModal)