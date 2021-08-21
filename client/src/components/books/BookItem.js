import React from 'react'
import PropTypes from 'prop-types'

// components
import { Link } from 'react-router-dom'

const BookItem = ({ book: { _id, title, notes } }) => {
  return (
    <Link to={`/book/${_id}`}>
      <div className="card card-title">
        <h4>{title}</h4>
        <p>{notes.length} nuggets</p>
      </div>
    </Link>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
}

export default BookItem
