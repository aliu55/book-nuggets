import axios from 'axios'
import config from '../config'

// redux
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_USER_FAIL,
    GET_USER_SUCCESS,
} from './types'

// function for setting token
import setAuthToken from '../utils/setAuthToken'

// load user
export const getUser = () => async (dispatch) => {
    
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        // if no token, then try to get user
        const res = await axios.get(`${config.apiUrl}/auth`)

        console.log(config.apiUrl)

        // response from server contains user info
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        
        dispatch({
            type: GET_USER_FAIL
        })

    }
}

// register user
export const register = ({ name, email, password }) => async (dispatch) => {

    try {

        const body = JSON.stringify({
            name,
            email,
            password
        })

        // send request to create a user
        const res = await axios.post(`${config.apiUrl}/users`, body, config.apiConfig)

        // response from server contains the user token
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(getUser())

    } catch (err) {

        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: REGISTER_FAIL
        })

    }
}

// login user
export const login = ({ email, password }) => async (dispatch) => {

    try {

        const body = JSON.stringify({
            email,
            password
        })

        // send request to login user
        const res = await axios.post(`${config.apiUrl}/auth`, body, config.apiConfig)

        // response from server contains the user token
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(getUser())

    } catch (err) {

        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: LOGIN_FAIL
        })

    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}