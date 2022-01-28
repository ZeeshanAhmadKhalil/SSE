import {
    CHANGE_USER_DATA,
    CHANGE_USER_DETAIL,
    RESET_STORE,
} from '../Actions/types'

const initialState = {
    userData: null,
    userDetail: null,
}

export default (state = initialState, { type, payload }) => {
    console.log('TYPE::')
    console.log(type)
    console.log('PAYLOAD::')
    console.log(payload)
    switch (type) {
        case RESET_STORE:
            return {
                ...state,
                // userData: null,  //! gives logical error 
                userDetail: null,
            }
        case CHANGE_USER_DETAIL:
            return {
                ...state,
                userDetail: payload
            }
        case CHANGE_USER_DETAIL:
            return {
                ...state,
                userDetail: payload
            }
        case CHANGE_USER_DATA:
            return {
                ...state,
                userData: payload
            }
        default:
            return state;
    }
}