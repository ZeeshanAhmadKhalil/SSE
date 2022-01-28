import Toast, { BaseToast } from 'react-native-toast-message'

import store from '../'
import { baseURL, cloudinaryURL } from '../../Config/baseURL'

import {
    CHANGE_LOADER,
    CHANGE_SHOPPING_CART,
} from '../Actions/types'

export const AddProductToCart = (productId) => {
    return async (dispatch) => {

        dispatch({ type: CHANGE_LOADER, payload: true })

        const token = store.getState().user.userData.token

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-token", token);

        var raw = JSON.stringify({
            productId: productId
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        var requestOptionsGet = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseURL + "/Api/Cart/AddProductToCart",
            requestOptions
        ).then(response => {
            console.log("RESPONSE")
            console.log(response)
            return response.status
        }).then(async status => {
            console.log("STATUS")
            console.log(status)
            if (status == 200) {
                let shoppingCart = await fetch(baseURL + "/Api/Cart/GetMyCart", requestOptionsGet).
                    then(response => response.json().then(data => ({ status: response.status, data, })))
                console.log("SHOPPINGCART")
                console.log(shoppingCart)
                dispatch({ type: CHANGE_SHOPPING_CART, payload: shoppingCart.data })
            } else if (status == 400) {
                Toast.show({
                    text1: 'Error!',
                    text2: "No more items availible",
                    position: 'top',
                })
            } else {
                console.error("Something went wrong while adding product in cart")
            }
            dispatch({ type: CHANGE_LOADER, payload: false })
        }).catch(error => {
            console.error('error', error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        })
    }
}
export const RemoveProductFromCart = (productId) => {
    return async (dispatch) => {

        dispatch({ type: CHANGE_LOADER, payload: true })

        const token = store.getState().user.userData.token

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-token", token);

        var raw = JSON.stringify({
            productId: productId
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        var requestOptionsGet = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseURL + "/Api/Cart/RemoveProductFromCart",
            requestOptions
        ).then(response => {
            console.log("RESPONSE")
            console.log(response)
            return response.status
        }).then(async status => {
            console.log("STATUS")
            console.log(status)
            if (status == 200) {
                let shoppingCart = await fetch(baseURL + "/Api/Cart/GetMyCart", requestOptionsGet).
                    then(response => response.json().then(data => ({ status: response.status, data, })))
                console.log("SHOPPINGCART")
                console.log(shoppingCart)
                dispatch({ type: CHANGE_SHOPPING_CART, payload: shoppingCart.data })
            } else {
                console.error("Something went wrong while adding product in cart")
            }
            dispatch({ type: CHANGE_LOADER, payload: false })
        }).catch(error => {
            console.error('error', error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        })
    }
}