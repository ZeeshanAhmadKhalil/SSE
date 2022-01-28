import Toast, { BaseToast } from 'react-native-toast-message'

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store from '../'

import { baseURL } from '../../Config/baseURL'
import {
    CHANGE_LOADER,
    CHANGE_USER_DATA,
    CHANGE_USER_DETAIL,
    RESET_STORE,
} from './types'

//STATE MANAGMENT
export const ChangeUserData = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_USER_DATA, payload: val })
    }
}

//FETCH & DISPATCH
export const SignIn = (email, password) => {
    return async (dispatch) => {
        console.log("SIGNIN")
        dispatch({ type: CHANGE_LOADER, payload: true })
        const fcmToken = await messaging().getToken();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password,
            "fcmToken": fcmToken,
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseURL + "/Api/User/Login",
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
                const jsonValue = JSON.stringify(data)
                AsyncStorage.setItem('@user', jsonValue)
                dispatch({ type: CHANGE_USER_DATA, payload: data })
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
export const SignUp = (data) => {
    return async (dispatch) => {
        console.log("SIGNUP")
        console.log(data)
        dispatch({ type: CHANGE_LOADER, payload: true })
        const fcmToken = await messaging().getToken();
        const { email, fullName, location, password, phone, } = data
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fullName": fullName,
            "phone": phone,
            "location": location,
            "email": email,
            "password": password,
            "fcmToken": fcmToken
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseURL + "/Api/User/Register",
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
                const jsonValue = JSON.stringify(data)
                AsyncStorage.setItem('@user', jsonValue)
                dispatch({ type: CHANGE_USER_DATA, payload: data })
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
export const Logout = () => {
    return async (dispatch) => {
        try {
            const token = store.getState().user.userData.token

            await AsyncStorage.removeItem('@user')
            dispatch({ type: CHANGE_USER_DATA, payload: '' })

            var myHeaders = new Headers();
            myHeaders.append("x-auth-token", token);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(baseURL + "/Api/User/Logout",
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
                    dispatch({ type: RESET_STORE, payload: undefined })
                    console.info(data)
                } else {
                    console.error("Something went wrong while logging out")
                }
            }).catch(error => {
                console.error('error', error)
            });
        } catch (e) {
            console.error(e)
        }
    }
}
export const GetUserById = (userId) => {
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

            fetch(baseURL + "/Api/User/GetUserById?userId=" + userId,
                requestOptions
            ).then(response => {
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
                    dispatch({ type: CHANGE_USER_DETAIL, payload: data })
                } else {
                    console.error("Something went wrong while getting user detail")
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

//HELPING METHODS   
export const GetUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}