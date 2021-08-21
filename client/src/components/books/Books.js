import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Books.css'

// components
import CreateBookModal from './CreateBookModal'
import BookItem from './BookItem'
import Spinner from '../layout/Spinner'

// redux
import { connect } from 'react-redux'
import { getBooks } from '../../actions/book'

const Books = ({ book, getBooks }) => {
    const { books, loading } = book
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getBooks()
    }, [getBooks])

    const refreshPage = () => {
        setShowModal(false)
        getBooks()
    }

    return (
        loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className={showModal ? 'cards blur' : 'cards'}>
                <div className="card card-add" onClick={() => setShowModal(true)}>
                    <span className="book-add-icon">+</span>
                </div>
                {books.map((book) => (
                    <BookItem key={book._id} book={book} />
                ))}
            </div>

            {showModal && (
                <CreateBookModal
                    onCancel={() => setShowModal(false)}
                    onCreate={refreshPage}
                />
            )}
        </Fragment>
    )
  )
}

Books.propTypes = {
  book: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  book: state.book,
})

export default connect(mapStateToProps, { getBooks })(Books)
