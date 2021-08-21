import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Notes.css'

// components
import Spinner from '../layout/Spinner'
import NoteItem from './NoteItem'
import AddButton from '../layout/AddButton'
import CreateNoteModal from './CreateNoteModal'

// redux
import { getBook } from '../../actions/book'
import { connect } from 'react-redux'

const Notes = ({ getBook, book: { book, loading }, match }) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getBook(match.params.book_id)
  }, [getBook])

  const refreshPage = () => {
    setShowModal(false)
    getBook(match.params.book_id)
  }

  return loading || book === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <AddButton />
      <div className="notes">
        {book.notes.map((note) => (
          <NoteItem key={note._id} note={note} bookId={book._id} />
        ))}
      </div> */}

      <div className={showModal ? 'notes blur' : 'notes'}>
        <h1 className="title">{book.title}</h1>

        <div className="note-add" onClick={() => setShowModal(true)}>
          <span className="note-add-icon">+</span>
        </div>

        {book.notes.map((note) => (
          <NoteItem key={note._id} note={note} bookId={book._id} />
        ))}
      </div>

      {showModal && (
        <CreateNoteModal
          onCancel={() => setShowModal(false)}
          onCreate={refreshPage}
          bookId={book._id}
        />
      )}
    </Fragment>
  )
}

Notes.propTypes = {
  getBook: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  book: state.book,
})

export default connect(mapStateToProps, { getBook })(Notes)
