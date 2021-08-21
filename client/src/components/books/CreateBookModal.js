import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import './CreateBookModal.css'

// redux
import { connect } from 'react-redux'
import { addBook } from '../../actions/book'

const CreateBookModal = ({ onCancel, onCreate, addBook }) => {
  const [title, setTitle] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addBook({ title })
    onCreate()
    setTitle('')
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
      <form className="book-form modal-center" onSubmit={(e) => onSubmit(e)}>
        <label>what book are you reading?</label>
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="book title"
            required
          />
        </div>

        <input type="submit" value="add" className="book-btn btn-success"/>
        <button type="button" onClick={onCancel} className="book-btn btn-danger">
          cancel
        </button>
      </form>
    </motion.div>
  )
}

CreateBookModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
}

export default connect(null, { addBook })(CreateBookModal)
