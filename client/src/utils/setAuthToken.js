// function that takes in a token
// if token is there, add it to headers
// otherwise, delete it

import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken