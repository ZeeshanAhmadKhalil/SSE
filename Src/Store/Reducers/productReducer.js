import update from 'immutability-helper';

import {
    CHANGE_PRODUCT_SEARCH_QUERY,
    CHANGE_IS_FOR_EXCHANGE,
    CHANGE_CITY_VALUE,
    CHANGE_IS_CITY_OPEN,
    CHANGE_CATEGORY_VALUE,
    CHANGE_IS_CATEGORY_OPEN,
    CHANGE_CONDITION_VALUE,
    CHANGE_IS_CONDITION_OPEN,
    ADD_PRODUCT_IMAGES,
    CHANGE_VIEWING_SELLING_PRODUCT_DETAILS,
    CHANGE_CONDITION_LIST,
    CHANGE_CATEGORY_LIST,
    CHANGE_CITY_LIST,
    REMOVE_PRODUCT_IMAGES,
    CHANGE_PRODUCTS_TO_SELL,
    CHANGE_EXCHANGE_TO_SELL,
    CHANGE_MOSTLY_LIKED_PRODUCTS,
    CHANGE_FIVE_PRODUCTS_TO_EXCHANGE,
    CHANGE_FIVE_PRODUCTS_TO_SELL,
    CHANGE_PRODUCT_DETAIL,
    CHANGE_PRODUCT_DETAIL_IMAGES,
    CHANGE_PRODUCTS_WITHSAME_CATEGORY,
    CHANGE_MY_PRODUCTS,
    CHANGE_MY_WISHLIST,
    CHANGE_SEARCHED_PRODUCTS,
    CHANGE_ORDERS,
    CHANGE_ORDER_DETAIL,
    CHANGE_MY_PRODUCTS_TO_EXCHANGE,
    CHANGE_REQUESTING_PRODUCT,
    CHANGE_REQUESTING_EXCHANGES,
    CHANGE_REQUESTED_EXCHANGES,
    CHANGE_RECOMMENDED_PRODUCTS,
    CHANGE_CJPRODUCTS,
} from '../Actions/types'

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

    mostlyLikedProducts: [],

    fiveProductsToSell: [],

    fiveProductsToExchange: [],

    recommendedProducts: [],

    productsToSell: [],

    productsToExchange: [],

    searchedProducts: [],
    productSearchQuery: '',

    isForExchange: false,

    viewingSellingProductDetails: false,

    similarCategoryProducts: [
        {
            image: require('../../Assets/Images/dog.jpg'),
            name: "Russian Dog",
            description: "The most popular Russian dog breeds are the Siberian Husky, Samoyed, Borzoi and Black Russian Terrier. However, other lesser known breeds include the Russian Spaniel, Moscow Water Dog, Laika breeds and so many more.",
            price: "60,000 /-",
            liked: false,
        },
        {
            image: require('../../Assets/Images/cat.jpg'),
            name: "Brown Cat",
            description: "The Havana Brown was the result of a planned breeding between Siamese and domestic black cats, by a group of cat fanciers in England, in the 1950s. Early breeders introduced a Siamese type Russian Blue into their breeding.",
            price: "3069.12 /-",
            liked: false,
        },
        {
            image: require('../../Assets/Images/headphones.jpg'),
            name: "Headphones",
            description: "Headphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears. They are electroacoustic transducers, which convert an electrical signal to a corresponding sound.",
            price: "12,000 /-",
            liked: false,
        },
        {
            image: require('../../Assets/Images/airpods.jpg'),
            name: "Apple Airpods",
            description: "AirPods are wireless Bluetooth earbuds designed by Apple. They were first released on September 7, 2016, with a 2nd generation released in March 2019. They are Apple's entry-level wireless headphones, sold alongside the AirPods Pro and AirPods Max.",
            price: "69,000 /-",
            liked: false,
        },
        {
            image: require('../../Assets/Images/ps5.jpg'),
            name: "Play Station 5",
            description: "In an improvement from the PS4, though, the PS5 automatically captures the last 60 minutes of your gameplay (up from the 15 minutes) at 1080p resolution and 60fps. The PS5 also lets you manually capture gameplay in 4K, though you'll have to tweak a setting to do so.",
            price: "400,000.21 /-",
            liked: false,
        },
    ],

    wishlist: [],

    myProducts: [],

    orders: [],
    orderDetail: null,

    requestedExchanges: [],
    requestingExchanges: [],

    myProductsToExchange: [],

    requestingProduct: null,

    cjProducts: [],
}

export default (state = initialState, { type, payload }) => {
    // console.log('TYPE::')
    // console.log(type)
    // console.log('PAYLOAD::')
    // console.log(payload)
    switch (type) {
        case CHANGE_CJPRODUCTS:
            return {
                ...state,
                cjProducts: payload
            }
        case CHANGE_RECOMMENDED_PRODUCTS:
            return {
                ...state,
                recommendedProducts: payload
            }
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
        case CHANGE_FIVE_PRODUCTS_TO_SELL:
            return {
                ...state,
                fiveProductsToSell: payload
            }
        case CHANGE_MOSTLY_LIKED_PRODUCTS:
            return {
                ...state,
                mostlyLikedProducts: payload
            }
        case CHANGE_FIVE_PRODUCTS_TO_EXCHANGE:
            return {
                ...state,
                fiveProductsToExchange: payload
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