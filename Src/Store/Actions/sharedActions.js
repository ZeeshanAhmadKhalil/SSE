import {
    CHANGE_SHOW_WALLET_PANNEL,
    CHANGE_SHOW_WISH_LIST_PANNEL,
    CHANGE_SHOW_MY_PRODUCTS_PANNEL,
    CHANGE_LOADER,
    CHANGE_NAVIGATION,
    CHANGE_BOTTOM_NAVIGATE,
    CHANGE_SHOW_DEPOSIT_REQUEST_PANNEL,
    CHANGE_SHOW_ORDER_PANNEL,
    CHANGE_SHOW_PRODUCTS_TO_EXCHANGE_PANNEL,
    CHANGE_SHOW_EXCHANGE_PRODUCT_PANNEL,
    CHANGE_REQUESTING_PRODUCT,
    CHANGE_RIGHT_DRAWER_NAVIGATION,
} from './types'

export const ChangeShowExchangeProductPannel = (val, requestingProduct) => {
    return async (dispatch) => {
        if (requestingProduct)
            dispatch({ type: CHANGE_REQUESTING_PRODUCT, payload: requestingProduct })
        dispatch({ type: CHANGE_SHOW_EXCHANGE_PRODUCT_PANNEL, payload: val })
    }
}
export const ChangeRightDrawerNavigation = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_RIGHT_DRAWER_NAVIGATION, payload: val })
    }
}
export const ChangeShowMyProductsToExchangePannel = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_SHOW_PRODUCTS_TO_EXCHANGE_PANNEL, payload: val })
    }
}
export const ChangeShowOrderPannel = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_SHOW_ORDER_PANNEL, payload: val })
    }
}
export const ChangeShowDepositRequestPannel = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_SHOW_DEPOSIT_REQUEST_PANNEL, payload: val })
    }
}
export const ChangeBottomNavigate = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_BOTTOM_NAVIGATE, payload: val })
    }
}
export const ChangeNavigation = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_NAVIGATION, payload: val })
    }
}
export const ChangeLoader = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_LOADER, payload: val })
    }
}
export const ChangeShowWalletPannel = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_SHOW_WALLET_PANNEL, payload: val })
    }
}
export const ChangeShowWishListPannel = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_SHOW_WISH_LIST_PANNEL, payload: val })
    }
}
export const ChangeShowMyProductsPannel = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_SHOW_MY_PRODUCTS_PANNEL, payload: val })
    }
}