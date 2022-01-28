import Toast, { BaseToast } from 'react-native-toast-message'

import store from '../'
import { baseURL, cloudinaryURL } from '../../Config/baseURL'
import { clarifaiApiKey } from '../../Config/apiKeys'

import {
    ADD_DEPOSIT_REQUEST,
    CHANGE_LOADER,
    CHANGE_SHOW_DEPOSIT_REQUEST_PANNEL,
    CHANGE_DEPOSIT_REQUESTS,
    CHANGE_SHOW_WALLET_PANNEL,
    CHANGE_TRANSACTIONS,
    CHANGE_BALANCE,
} from '../Actions/types'

//FETCH AND DISPATCH

export const DepositRequest = (data) => {
    return async (dispatch) => {
        console.log("DepositRequest")
        console.log(data)

        dispatch({ type: CHANGE_LOADER, payload: true })

        const token = store.getState().user.userData.token

        const { bankName, accountNumber, accountTitle, amount, } = data

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-token", token);

        var raw = JSON.stringify({
            bankName,
            accountNumber,
            accountTitle,
            amount,
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseURL + "/Api/Wallet/DepositRequest",
            requestOptions
        ).then(response => {
            console.log("RESPONSE")
            console.log(response)
            return response.json().then(data => ({
                status: response.status,
                data,
            }))
        }).then(result => {
            console.log("RESULT")
            console.log(result)
            const { status, data } = result
            if (status == 200) {
                Toast.show({
                    text1: 'Success!',
                    text2: "Deposit Request is Successfully Added",
                    position: 'top',
                })
                dispatch({ type: CHANGE_SHOW_DEPOSIT_REQUEST_PANNEL, payload: false })
                dispatch({ type: ADD_DEPOSIT_REQUEST, payload: data })
            } else if (status == 400) {
                if (data.errors) {
                    let errorMessage = ""
                    data.errors.forEach(element => {
                        errorMessage = errorMessage + element.msg + ", "
                    });
                    Toast.show({
                        text1: 'Error!',
                        text2: errorMessage,
                        position: 'top',
                    })
                }
            }
            dispatch({ type: CHANGE_LOADER, payload: false })
        }).catch(error => {
            console.error('error', error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        })
    }
}
export const GetDepositRequests = () => {
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

            fetch(baseURL + "/Api/Wallet/GetDepositRequests",
                requestOptions
            ).then(response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data => ({
                    status: response.status,
                    data,
                }))
            }).then(result => {
                console.log("RESULT")
                console.log(result)
                const { status, data } = result
                if (status == 200) {
                    dispatch({ type: CHANGE_DEPOSIT_REQUESTS, payload: data })
                } else {
                    console.error("Something went wrong while getting deposit requests")
                }
                dispatch({ type: CHANGE_LOADER, payload: false })
            }).catch(error => {
                console.error('error', error)
                dispatch({ type: CHANGE_LOADER, payload: false })
            });
        } catch (e) {
            console.error(e)
            dispatch({ type: CHANGE_LOADER, payload: false })
        }
    }
}
export const GetTransactions = () => {
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

            fetch(baseURL + "/Api/Wallet/GetTransactions",
                requestOptions
            ).then(async response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data => ({
                    status: response.status,
                    data,
                }))
            }).then(async result => {
                console.log("RESULT")
                console.log(result)
                const { status, data } = result
                if (status == 200) {
                    dispatch({ type: CHANGE_SHOW_WALLET_PANNEL, payload: true })
                    dispatch({ type: CHANGE_TRANSACTIONS, payload: data })
                    let balance = await fetch(baseURL + "/Api/Wallet/GetBalance", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, })))
                    dispatch({ type: CHANGE_BALANCE, payload: balance.data })
                } else {
                    console.error("Something went wrong while getting transactions")
                }
                dispatch({ type: CHANGE_LOADER, payload: false })
            }).catch(error => {
                console.error('error', error)
                dispatch({ type: CHANGE_LOADER, payload: false })
            });
        } catch (e) {
            console.error(e)
            dispatch({ type: CHANGE_LOADER, payload: false })
        }
    }
}