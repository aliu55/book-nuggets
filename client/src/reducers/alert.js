import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types'


// format of inital state
// [
//     {
//         msg: 'Logged in successfully',
//         alertType; 'success'
//         id: 1
//     }
// ]

const initialState = []

export default function alertReducer(state = initialState, action) {
    const { type, payload } = action
    
    switch (type) {
        
        case SET_ALERT:
            // payload here is { msg, alertType, id }zzz
            return [...state, payload]
        
        case REMOVE_ALERT:
            // payload here is just the id 
            return state.filter( alert => alert.id !== payload )
    
        default:
            return state
        
    }
}

// if you're confused about why the payload is different
// then refer to alert.js in actions to look at
// what's getting passed in as the payload in each dispatch