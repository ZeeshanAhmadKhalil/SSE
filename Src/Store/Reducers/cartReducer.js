import {
    CHANGE_SHOPPING_CART,
    ORDER_PRODUCTS,
} from '../Actions/types'

const initialState = {
    shoppingCart: []
}

export default (state = initialState, { type, payload }) => {
    // console.log('TYPE::')
    // console.log(type)
    // console.log('PAYLOAD::')
    // console.log(payload)
    switch (type) {
        case ORDER_PRODUCTS:
            return {
                ...state,
                shoppingCart: []
            }
        case CHANGE_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: payload
            }
        default:
            return state;
    }
}