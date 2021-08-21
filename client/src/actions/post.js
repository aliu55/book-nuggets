import axios from 'axios'
import config from '../config'
import { setAlert } from './alert'
import {
    GET_POSTS,
    GET_POST,
    DELETE_POST,
    ADD_POST,
    UPDATE_LIKES,
    POST_ERROR,
    ADD_COMMENT,
    DELETE_COMMENT,
} from './types'


export const getPosts = () => async (dispatch) => {
    try {

        const res = await axios.get(`${config.apiUrl}/posts`)

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getPost = postId => async dispatch => {

    try {
        const res = await axios.get(`${config.apiUrl}/posts/${postId}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const deletePost = id => async (dispatch) => {
    try {

        await axios.delete(`${config.apiUrl}/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

export const addPost = formData => async (dispatch) => {
    try {

        const res = await axios.post(`${config.apiUrl}/posts`, formData, config.apiConfig)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

export const addLike = postId => async (dispatch) => {
    try {

        const res = await axios.put(`${config.apiUrl}/posts/like/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const removeLike = postId => async (dispatch) => {
    try {

        const res = await axios.put(`${config.apiUrl}/posts/unlike/${postId}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        
        await axios.delete(`${config.apiUrl}/posts/comment/${postId}/${commentId}`)

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addComment = (postId, formData) => async (dispatch) => {
    try {
        const res = await axios.post(`${config.apiUrl}/posts/comment/${postId}`, formData, config.apiConfig)
    
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
    
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

