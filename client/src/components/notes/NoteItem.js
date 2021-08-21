import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import './NoteItem.css'

// redux

const NoteItem = ({ note, bookId }) => {
    return (
        <div id={note.type} className="note">
            <p className="note-date">
            <Moment format="YYYY/MM/DD">{note.date}</Moment>
            </p>
            <p className="note-text">{note.text}</p>
            <p id={note.type} className="note-type">{note.type}</p>
        </div>
    )
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    // bookId: PropTypes.number.isRequired,
}

export default NoteItem