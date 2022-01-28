import {
    CHANGE_SHOW_WALLET_PANNEL,
    CHANGE_SHOW_WISH_LIST_PANNEL,
    CHANGE_SHOW_MY_PRODUCTS_PANNEL,
    CHANGE_LOADER,
    CHANGE_NAVIGATION,
    LIKE_PRODUCT,
    CHANGE_BOTTOM_NAVIGATE,
    CHANGE_SHOW_DEPOSIT_REQUEST_PANNEL,
    CHANGE_SHOW_ORDER_PANNEL,
    CHANGE_SHOW_PRODUCTS_TO_EXCHANGE_PANNEL,
    CHANGE_SHOW_EXCHANGE_PRODUCT_PANNEL,
    CHANGE_RIGHT_DRAWER_NAVIGATION,
} from '../Actions/types'

const initialState = {
    loader: false,
    navigation: null,
    bottomNavigate: null,
    rightDrawerNavigation: null,

    likeProducts: [],

    showWalletPannel: false,
    showWishListPannel: false,
    showMyProductsPannel: false,
    showDepositRequestPannel: false,
    showOrderPannel: false,
    showMyProductsToExchangePannel: false,
    showExchangeProductPannel: false,
}

export default (state = initialState, { type, payload }) => {
    // console.log('TYPE::')
    // console.log(type)
    // console.log('PAYLOAD::')
    // console.log(payload)
    switch (type) {
        case CHANGE_RIGHT_DRAWER_NAVIGATION:
            return {
                ...state,
                rightDrawerNavigation: payload,
            }
        case CHANGE_SHOW_EXCHANGE_PRODUCT_PANNEL:
            return {
                ...state,
                showExchangeProductPannel: payload,
            }
        case CHANGE_SHOW_PRODUCTS_TO_EXCHANGE_PANNEL:
            return {
                ...state,
                showMyProductsToExchangePannel: payload,
            }
        case CHANGE_SHOW_ORDER_PANNEL:
            return {
                ...state,
                showOrderPannel: payload,
            }
        case CHANGE_SHOW_DEPOSIT_REQUEST_PANNEL:
            return {
                ...state,
                showDepositRequestPannel: payload,
            }
        case CHANGE_BOTTOM_NAVIGATE:
            return {
                ...state,
                bottomNavigate: payload,
            }
        case LIKE_PRODUCT:
            return {
                ...state,
                likeProducts: state.likeProducts.includes(payload) ? state.likeProducts.filter(obj => obj != payload) : state.likeProducts.concat(payload),
            }
        case CHANGE_NAVIGATION:
            return {
                ...state,
                navigation: payload,
            }
        case CHANGE_LOADER:
            return {
                ...state,
                loader: payload,
            }
        case CHANGE_SHOW_WALLET_PANNEL:
            return {
                ...state,
                showWalletPannel: payload,
            }
        case CHANGE_SHOW_WISH_LIST_PANNEL:
            return {
                ...state,
                showWishListPannel: payload,
            }
        case CHANGE_SHOW_MY_PRODUCTS_PANNEL:
            return {
                ...state,
                showMyProductsPannel: payload,
            }
        default:
            return state;
    }
}