import update from 'immutability-helper';
import {
    ADD_PRODUCT_IMAGES, CHANGE_CATEGORY_LIST, CHANGE_CATEGORY_VALUE, CHANGE_CITY_LIST, CHANGE_CITY_VALUE, CHANGE_CONDITION_LIST, CHANGE_CONDITION_VALUE, CHANGE_EXCHANGE_TO_SELL, CHANGE_IS_CATEGORY_OPEN, CHANGE_IS_CITY_OPEN, CHANGE_IS_CONDITION_OPEN, CHANGE_IS_FOR_EXCHANGE, CHANGE_MY_PRODUCTS, CHANGE_MY_PRODUCTS_TO_EXCHANGE, CHANGE_MY_WISHLIST, CHANGE_ORDERS,
    CHANGE_ORDER_DETAIL, CHANGE_PRODUCTS_TO_SELL, CHANGE_PRODUCTS_WITHSAME_CATEGORY, CHANGE_PRODUCT_DETAIL,
    CHANGE_PRODUCT_DETAIL_IMAGES, CHANGE_PRODUCT_SEARCH_QUERY, CHANGE_REQUESTED_EXCHANGES, CHANGE_REQUESTING_EXCHANGES, CHANGE_REQUESTING_PRODUCT, CHANGE_SEARCHED_PRODUCTS, CHANGE_VIEWING_SELLING_PRODUCT_DETAILS, REMOVE_PRODUCT_IMAGES
} from '../Actions/types';


const initialState = {

    productDetail: null,
    productDetailImages: [],
    productsWithSameCategory: [],

    isCityOpen: false,
    cityValue: "",
    cityList: [],
    isCategoryOpen: false,
    categoryValue: "",
    categoryList: [],
    isConditionOpen: false,
    conditionValue: "",
    conditionList: [],
    productImages: [],

    productsToSell: [],

    productsToExchange: [],

    searchedProducts: [],
    productSearchQuery: '',

    isForExchange: false,

    viewingSellingProductDetails: false,

    similarCategoryProducts: [],

    wishlist: [],

    myProducts: [],

    orders: [],
    orderDetail: null,

    requestedExchanges: [],
    requestingExchanges: [],

    myProductsToExchange: [],

    requestingProduct: null,

}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_REQUESTED_EXCHANGES:
            return {
                ...state,
                requestedExchanges: payload
            }
        case CHANGE_REQUESTING_EXCHANGES:
            return {
                ...state,
                requestingExchanges: payload
            }
        case CHANGE_REQUESTING_PRODUCT:
            return {
                ...state,
                requestingProduct: payload
            }
        case CHANGE_MY_PRODUCTS_TO_EXCHANGE:
            return {
                ...state,
                myProductsToExchange: payload
            }
        case CHANGE_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: payload
            }
        case CHANGE_ORDERS:
            return {
                ...state,
                orders: payload
            }
        case CHANGE_SEARCHED_PRODUCTS:
            return {
                ...state,
                searchedProducts: payload
            }
        case CHANGE_MY_WISHLIST:
            return {
                ...state,
                wishlist: payload
            }
        case CHANGE_MY_PRODUCTS:
            return {
                ...state,
                myProducts: payload
            }
        case CHANGE_PRODUCTS_WITHSAME_CATEGORY:
            return {
                ...state,
                productsWithSameCategory: payload
            }
        case CHANGE_PRODUCT_DETAIL_IMAGES:
            return {
                ...state,
                productDetailImages: payload.map(obj => obj.path)
            }
        case CHANGE_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: payload
            }
        case CHANGE_EXCHANGE_TO_SELL:
            return {
                ...state,
                productsToExchange: payload
            }
        case CHANGE_PRODUCTS_TO_SELL:
            return {
                ...state,
                productsToSell: payload
            }
        case REMOVE_PRODUCT_IMAGES:
            return {
                ...state,
                productImages: []
            }
        case CHANGE_CITY_LIST:
            return {
                ...state,
                cityList: payload,
            }
        case CHANGE_CATEGORY_LIST:
            return {
                ...state,
                categoryList: payload,
            }
        case CHANGE_CONDITION_LIST:
            return {
                ...state,
                conditionList: payload,
            }
        case CHANGE_VIEWING_SELLING_PRODUCT_DETAILS:
            return {
                ...state,
                viewingSellingProductDetails: payload,
            }
        case ADD_PRODUCT_IMAGES:
            return {
                ...state,
                productImages: update(state.productImages, {
                    $push: [payload]
                })
            }
        case CHANGE_CONDITION_VALUE:
            return {
                ...state,
                conditionValue: payload
            }
        case CHANGE_IS_CONDITION_OPEN:
            return {
                ...state,
                isConditionOpen: payload
            }
        case CHANGE_CATEGORY_VALUE:
            return {
                ...state,
                categoryValue: payload
            }
        case CHANGE_IS_CATEGORY_OPEN:
            return {
                ...state,
                isCategoryOpen: payload
            }
        case CHANGE_CITY_VALUE:
            return {
                ...state,
                cityValue: payload
            }
        case CHANGE_IS_CITY_OPEN:
            return {
                ...state,
                isCityOpen: payload
            }
        case CHANGE_IS_FOR_EXCHANGE:
            return {
                ...state,
                isForExchange: payload,
            }
        case CHANGE_PRODUCT_SEARCH_QUERY:
            return {
                ...state,
                productSearchQuery: payload,
            }
        default:
            return state;
    }
}