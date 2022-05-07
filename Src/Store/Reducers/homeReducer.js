import {
    CHANGE_CJPRODUCTS,
    CHANGE_FIVE_PRODUCTS_TO_EXCHANGE,
    CHANGE_FIVE_PRODUCTS_TO_SELL,
    CHANGE_MOSTLY_LIKED_PRODUCTS,
    CHANGE_RECOMMENDED_PRODUCTS
} from '../Actions/types';


const initialState = {
    cjProducts: [],
    recommendedProducts: [],
    fiveProductsToSell: [],
    mostlyLikedProducts: [],
    fiveProductsToExchange: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_MOSTLY_LIKED_PRODUCTS:
            return {
                ...state,
                mostlyLikedProducts: payload
            }
        case CHANGE_FIVE_PRODUCTS_TO_SELL:
            return {
                ...state,
                fiveProductsToSell: payload
            }
        case CHANGE_FIVE_PRODUCTS_TO_EXCHANGE:
            return {
                ...state,
                fiveProductsToExchange: payload
            }
        case CHANGE_RECOMMENDED_PRODUCTS:
            return {
                ...state,
                recommendedProducts: payload
            }
        case CHANGE_CJPRODUCTS:
            return {
                ...state,
                cjProducts: payload
            }
        default:
            return state;
    }
}