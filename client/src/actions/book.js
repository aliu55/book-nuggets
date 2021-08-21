import axios from 'axios'
import config from '../config'
import { setAlert } from './alert'
import {
    GET_BOOKS,
    GET_BOOK,
    BOOK_ERROR,
    ADD_BOOK,
    DELETE_BOOK,
    ADD_NOTE,
    DELETE_NOTE,
} from './types'

// book
export const getBooks = () => async (dispatch) => {
    try {

        const res = await axios.get(`${config.apiUrl}/books`)

        dispatch({
            type: GET_BOOKS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: BOOK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getBook = bookId => async (dispatch) => {
    try {

        const res = await axios.get(`${config.apiUrl}/books/${bookId}`)

        dispatch({
            type: GET_BOOK,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: BOOK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deleteBook = bookId => async (dispatch) => {
    try {
        
        await axios.delete(`${config.apiUrl}/books/${bookId}`)

        dispatch({
            type: DELETE_BOOK,
            payload: bookId
        })

    } catch (err) {
        dispatch({
            type: BOOK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addBook = formData => async (dispatch) => {
    try {

        const res = await axios.post(`${config.apiUrl}/books`, formData, config.apiConfig)
    
        dispatch({
            type: ADD_BOOK,
            payload: res.data
        })
        
    } catch (err) {
        
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: BOOK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }

}

// note 
export const addNote = (bookId, formData) => async (dispatch) => {
    try {

        const res = await axios.post(`${config.apiUrl}/books/notes/${bookId}`, formData, config.apiConfig)

        dispatch({
            type: ADD_NOTE,
            payload: res.data
        })
        
    } catch (err) {
                
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: BOOK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })

    }
}

export const deleteNote = (bookId, noteId) => async (dispatch) => {
    try {

        axios.delete(`${config.apiUrl}/books/notes/${bookId}/${noteId}`)

        dispatch({
            type: DELETE_NOTE,
            payload: noteId
        })
        
    } catch (err) {

        dispatch({
            type: BOOK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })

    }
}