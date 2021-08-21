import {
    GET_BOOKS,
    GET_BOOK,
    BOOK_ERROR,
    ADD_BOOK,
    DELETE_BOOK,
    ADD_NOTE,
    DELETE_NOTE,
} from '../actions/types'

const initialState = {
    books: [],
    book: null,
    loading: true,
    error: {}
}

export default function bookReducer(state = initialState, action) {
    
    const { type, payload } = action
    
    switch (type) {
        case GET_BOOKS:
            return {
                ...state,
                books: payload,
                loading: false,
            }
        
        case GET_BOOK:
            return {
                ...state,
                book: payload,
                loading: false
            }
        
        case ADD_BOOK:
            return {
                ...state,
                books: [payload, ...state.books],
                loading: false,
            }
        
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book._id !== payload),
                loading: false,
            }
        
        case ADD_NOTE:
            return {
                ...state,
                book: { ...state.book, notes: payload },
                loading: false,
            }
        
        case DELETE_NOTE:
            return {
                ...state,
                book: { ...state.book, notes: state.book.notes.filter(note => note._id !== payload) },
                loading: false,
            }
        
        case BOOK_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        
        default:
            return state
    }

}