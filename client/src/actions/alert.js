import { v4 as uuidv4 } from 'uuid'
import {
    SET_ALERT,
    REMOVE_ALERT
} from './types'

export const setAlert = (msg, alertType) => dispatch => {
    
    // randomly generate an id for each alert
    const id = uuidv4()

    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })

    // remove alert automatically after a couple seconds
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 3000)

}
