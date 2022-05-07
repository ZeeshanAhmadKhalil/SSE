import store from '../';
import {
    cjAccessAey, cjEmail
} from '../../Config/apiKeys';
import {
    baseURL, cjBaseUrl
} from '../../Config/baseURL';
import {
    CHANGE_BALANCE,
    CHANGE_CJPRODUCTS,
    CHANGE_FIVE_PRODUCTS_TO_EXCHANGE,
    CHANGE_FIVE_PRODUCTS_TO_SELL,
    CHANGE_LOADER,
    CHANGE_MOSTLY_LIKED_PRODUCTS,
    CHANGE_RECOMMENDED_PRODUCTS,
    CHANGE_SHOPPING_CART,
} from '../Actions/types';

//STATE MANAGMENT

//FETCH AND DISPATCH
export const GetHomeData = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: CHANGE_LOADER, payload: true })

            const token = store.getState().user.userData.token

            var myHeaders = new Headers();
            myHeaders.append("x-auth-token", token);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            var myHeadersCJPOST = new Headers();
            myHeadersCJPOST.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": cjEmail,
                "password": cjAccessAey
            });

            var requestOptionsCJPOST = {
                method: 'POST',
                headers: myHeadersCJPOST,
                body: raw,
                redirect: 'follow'
            };

            let accessToken = await fetch(cjBaseUrl + "/api2.0/v1/authentication/getAccessToken", requestOptionsCJPOST)
                .then(response => response.json().then(data => ({ status: response.status, data, })))

            var myHeadersCJGET = new Headers();
            myHeadersCJGET.append("CJ-Access-Token", accessToken.data.data.accessToken);

            var requestOptionsCJGET = {
                method: 'GET',
                headers: myHeadersCJGET,
                redirect: 'follow'
            };


            let [
                mostlyLikedProducts,
                sellingProducts,
                exchangeProducts,
                shoppingCart,
                balance,
                recommendedProducts,
                cjProducts
            ] = await Promise.all([
                fetch(baseURL + "/Api/Product/GetMostlyLikedProducts", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(baseURL + "/Api/Product/GetSellingProducts?limit=5&skip=0", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(baseURL + "/Api/Product/GetExchangeProducts?limit=5&skip=0", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(baseURL + "/Api/Cart/GetMyCart", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(baseURL + "/Api/Wallet/GetBalance", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(baseURL + "/Api/Product/GetRecommendedProducts", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(cjBaseUrl + "/api2.0/v1/product/list?categoryKeyword=shoes&pageSize=10", requestOptionsCJGET).then(response => response.json().then(data => ({ status: response.status, data, })))
            ]).catch((error) => {
                console.error(error)
                dispatch({ type: CHANGE_LOADER, payload: false })
            })

            if (
                exchangeProducts.status == 200 &&
                sellingProducts.status == 200 &&
                mostlyLikedProducts.status == 200 &&
                shoppingCart.status == 200 &&
                balance.status == 200 &&
                recommendedProducts.status == 200 &&
                cjProducts.status == 200
            ) {
                dispatch({ type: CHANGE_MOSTLY_LIKED_PRODUCTS, payload: mostlyLikedProducts.data })
                dispatch({ type: CHANGE_FIVE_PRODUCTS_TO_SELL, payload: sellingProducts.data })
                dispatch({ type: CHANGE_FIVE_PRODUCTS_TO_EXCHANGE, payload: exchangeProducts.data })
                dispatch({ type: CHANGE_SHOPPING_CART, payload: shoppingCart.data })
                dispatch({ type: CHANGE_BALANCE, payload: balance.data })
                dispatch({ type: CHANGE_RECOMMENDED_PRODUCTS, payload: recommendedProducts.data })
                dispatch({ type: CHANGE_CJPRODUCTS, payload: cjProducts.data.data.list })
            } else {
                console.error(mostlyLikedProducts.data)
                console.error(sellingProducts.data)
                console.error(exchangeProducts.data)
                console.error(shoppingCart.data)
                console.error(balance.data)
            }

            dispatch({ type: CHANGE_LOADER, payload: false })
        } catch (e) {
            console.error("ERROR")
            console.error(e)
            dispatch({ type: CHANGE_LOADER, payload: false })
        }
    }
}

//HELPING METHODS