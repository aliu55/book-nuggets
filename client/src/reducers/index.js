import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post'
import book from './book'

export default combineReducers({
    alert,
    auth,
    post,
    book
})
