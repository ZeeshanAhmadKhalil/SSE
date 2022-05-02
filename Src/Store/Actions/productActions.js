import Clarifai from 'clarifai';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-crop-picker'; // todo: Upgrade gradle to 4.0.1 https://github.com/ivpusic/react-native-image-crop-picker/issues/1416#issuecomment-700644075
import Toast from 'react-native-toast-message';
import store from '../';
import {
    cjAccessAey, cjEmail, clarifaiApiKey
} from '../../Config/apiKeys';
import {
    baseURL, cjBaseUrl, cloudinaryURL
} from '../../Config/baseURL';
import { GetLocation, GetLocationPermission } from '../../Config/Helper';
import {
    ADD_PRODUCT_IMAGES,
    CHANGE_BALANCE,
    CHANGE_CATEGORY_LIST,
    CHANGE_CATEGORY_VALUE,
    CHANGE_CITY_LIST,
    CHANGE_CITY_VALUE,
    CHANGE_CJPRODUCTS,
    CHANGE_CONDITION_LIST,
    CHANGE_CONDITION_VALUE,
    CHANGE_EXCHANGE_TO_SELL,
    CHANGE_FIVE_PRODUCTS_TO_EXCHANGE,
    CHANGE_FIVE_PRODUCTS_TO_SELL,
    CHANGE_IS_CATEGORY_OPEN,
    CHANGE_IS_CITY_OPEN,
    CHANGE_IS_CONDITION_OPEN,
    CHANGE_IS_FOR_EXCHANGE,
    CHANGE_LOADER,
    CHANGE_MOSTLY_LIKED_PRODUCTS,
    CHANGE_MY_PRODUCTS,
    CHANGE_MY_PRODUCTS_TO_EXCHANGE,
    CHANGE_MY_WISHLIST,
    CHANGE_ORDERS,
    CHANGE_ORDER_DETAIL,
    CHANGE_PRODUCTS_TO_SELL,
    CHANGE_PRODUCTS_WITHSAME_CATEGORY,
    CHANGE_PRODUCT_DETAIL,
    CHANGE_PRODUCT_DETAIL_IMAGES,
    CHANGE_PRODUCT_SEARCH_QUERY,
    CHANGE_RECOMMENDED_PRODUCTS,
    CHANGE_REQUESTED_EXCHANGES,
    CHANGE_REQUESTING_EXCHANGES,
    CHANGE_SEARCHED_PRODUCTS,
    CHANGE_SHOPPING_CART,
    CHANGE_SHOW_EXCHANGE_PRODUCT_PANNEL,
    CHANGE_SHOW_MY_PRODUCTS_PANNEL,
    CHANGE_SHOW_ORDER_PANNEL,
    CHANGE_SHOW_PRODUCTS_TO_EXCHANGE_PANNEL,
    CHANGE_SHOW_WISH_LIST_PANNEL,
    CHANGE_VIEWING_SELLING_PRODUCT_DETAILS,
    LIKE_PRODUCT,
    ORDER_PRODUCTS,
    REMOVE_PRODUCT_IMAGES
} from '../Actions/types';

//STATE MANAGMENT
export const ChangeViewingSellingProductDetails = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_VIEWING_SELLING_PRODUCT_DETAILS, payload: val })
    }
}
export const AddProductImages = (image) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_LOADER, payload: true })

        console.log("IMAGE")
        console.log(image)

        let uploaded = 0

        let images = []
        if (image.length == undefined)
            images.push(image)
        else
            images = image

        images.map(async (item) => {
            const { height, mime, modificationDate, path, size, width, } = item

            const uri = path;
            const type = mime;
            const name = modificationDate + ".jpg";
            const source = {
                uri,
                type,
                name,
            }
            const data = new FormData()
            data.append('file', source)
            data.append('upload_preset', 'sumraizkundi')
            data.append("cloud_name", "defenderkhan")

            let result = await fetch(cloudinaryURL, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                return response.json()
            }).catch(error => {
                console.error(error)
                dispatch({ type: CHANGE_LOADER, payload: false })
            })

            console.log("RESULT")
            console.log(result)

            dispatch({ type: ADD_PRODUCT_IMAGES, payload: result.url })

            uploaded = uploaded + 1
            console.log("UPLOADED")
            console.log(uploaded)
            console.log("IMAGES.LENGTH")
            console.log(images.length)
            if (uploaded == images.length)
                dispatch({ type: CHANGE_LOADER, payload: false })
        })
    }
}
export const ChangeConditionValue = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_CONDITION_VALUE, payload: val })
    }
}
export const ChangeIsConditionOpen = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_IS_CONDITION_OPEN, payload: val })
    }
}
export const ChangeCategoryValue = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_CATEGORY_VALUE, payload: val })
    }
}
export const ChangeIsCategoryOpen = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_IS_CATEGORY_OPEN, payload: val })
    }
}
export const ChangeCityValue = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_CITY_VALUE, payload: val })
    }
}
export const ChangeIsCityOpen = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_IS_CITY_OPEN, payload: val })
    }
}
export const ChangeIsForExchange = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_IS_FOR_EXCHANGE, payload: val })
    }
}
export const ChangeProductSearchQuery = (val) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_PRODUCT_SEARCH_QUERY, payload: val })
    }
}
export const AddLikeProduct = (productId) => {
    return async (dispatch) => {
        dispatch({ type: LIKE_PRODUCT, payload: productId })
    }
}

//FETCH AND DISPATCH
export const ChangeOrderStatus = (orderId, orderStatus, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CHANGE_LOADER, payload: true })

            const token = store.getState().user.userData.token

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-auth-token", token);

            var raw = JSON.stringify({
                orderId,
                status: orderStatus,
            });

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let result = await fetch(baseURL + "/Api/Product/ChangeOrderStatus",
                requestOptions
            ).then(response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data => ({
                    status: response.status,
                    data,
                }))
            })

            const { status, data } = result
            console.log("DATA")
            console.log(data)

            if (status == 200) {
                dispatch(GetOrderById(orderId, navigate))
            } else if (status == 400) {
                Toast.show({
                    text1: 'Error!',
                    text2: data.data,
                    position: 'top',
                })
                dispatch({ type: CHANGE_LOADER, payload: false })
            } else {
                console.error("Something went wrong while exchanging the products")
                dispatch({ type: CHANGE_LOADER, payload: false })
            }

        } catch (error) {
            console.error('error', error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        }
    }
}
export const ExchangeProducts = (data1, isPaymentByHand, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CHANGE_LOADER, payload: true })

            const { deliveryAddress } = data1

            const token = store.getState().user.userData.token

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-auth-token", token);

            let requestedProduct = store.getState().product.productDetail.product._id
            let requestingProduct = store.getState().product.requestingProduct

            var raw = JSON.stringify({
                deliveryAddress,
                isPaymentByHand,
                requestingProduct,
                requestedProduct,
            });

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let result = await fetch(baseURL + "/Api/Product/ExchangeProducts",
                requestOptions
            ).then(response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data => ({
                    status: response.status,
                    data,
                }))
            })

            const { status, data } = result
            console.log("DATA")
            console.log(data)

            if (status == 200) {
                // dispatch({ type: ORDER_PRODUCTS })
                dispatch({ type: CHANGE_SHOW_PRODUCTS_TO_EXCHANGE_PANNEL, payload: false })
                dispatch({ type: CHANGE_SHOW_EXCHANGE_PRODUCT_PANNEL, payload: false })

                dispatch(GetRequestedExchanges())
                dispatch(GetRequestingExchanges())

                navigate('Delivery', { screen: 'Exchanges' })
            } else if (status == 400) {
                Toast.show({
                    text1: 'Error!',
                    text2: data.data,
                    position: 'top',
                })
                dispatch({ type: CHANGE_LOADER, payload: false })
            } else {
                console.error("Something went wrong while exchanging the products")
                dispatch({ type: CHANGE_LOADER, payload: false })
            }

        } catch (error) {
            console.error('error', error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        }
    }
}
export const MarkAsExchanged = (exchangeId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CHANGE_LOADER, payload: true })

            const token = store.getState().user.userData.token

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-auth-token", token);

            var raw = JSON.stringify({
                exchangeId,
            });

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            let result = await fetch(baseURL + "/Api/Product/MarkAsExchanged",
                requestOptions
            ).then(response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data => ({
                    status: response.status,
                    data,
                }))
            })

            const { status, data } = result
            console.log("DATA")
            console.log(data)

            if (status == 200) {
                dispatch(GetRequestingExchanges())
                dispatch(GetRequestedExchanges())
            } else if (status == 400) {
                Toast.show({
                    text1: 'Error!',
                    text2: data.data,
                    position: 'top',
                })
                dispatch({ type: CHANGE_LOADER, payload: false })
            } else {
                console.error("Something went wrong while exchanging the products")
                dispatch({ type: CHANGE_LOADER, payload: false })
            }
        } catch (error) {
            console.error('error', error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        }
    }
}
export const OrderProduct = (data, isPaymentByHand, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CHANGE_LOADER, payload: true })

            const { deliveryAddress } = data

            const token = store.getState().user.userData.token

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("x-auth-token", token);

            var raw = JSON.stringify({
                deliveryAddress,
                isPaymentByHand,
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

            let result = await fetch(baseURL + "/Api/Product/OrderProducts",
                requestOptions
            ).then(response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data1 => ({
                    status: response.status,
                    data1,
                }))
            })

            const { status, data1 } = result
            console.log("DATA")
            console.log(data1)

            if (status == 200) {
                dispatch({ type: ORDER_PRODUCTS })
                dispatch({ type: CHANGE_SHOW_ORDER_PANNEL, payload: false })
                let balance = await fetch(baseURL + "/Api/Wallet/GetBalance", requestOptionsGet)
                    .then(response => response.json().then(data2 => ({ status: response.status, data2, })))
                dispatch({ type: CHANGE_BALANCE, payload: balance.data2 })
                navigate('Delivery', { screen: 'Orders' })
            } else if (status == 400) {
                let errorMsg = ""
                if (data1.errorMsg) {
                    errorMsg = data1.errorMsg
                } else {
                    data1.forEach(element => {
                        errorMsg = errorMsg + element + ", "
                    });
                    errorMsg = errorMsg + "unavailble."
                }
                Toast.show({
                    text1: 'Error!',
                    text2: errorMsg,
                    position: 'top',
                })

            } else {
                console.error("Something went wrong while ordering the products")
            }
            dispatch({ type: CHANGE_LOADER, payload: false })

        } catch (error) {
            console.error('error', error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        }
    }
}
export const GetAddProductData = () => {
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

            let [cities, categories, conditions] = await Promise.all([
                fetch(baseURL + "/Api/Product/GetCities", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(baseURL + "/Api/Product/GetCategories", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
                fetch(baseURL + "/Api/Product/GetConditions", requestOptions).then(response => response.json().then(data => ({ status: response.status, data, }))),
            ]).catch((error) => {
                console.error(error)
                dispatch({ type: CHANGE_LOADER, payload: false })
            })

            if (cities.status == 200 && categories.status == 200 && conditions.status == 200) {
                let cityListTemp = []
                cities.data.map(item => {
                    cityListTemp.push({ label: item.cityName, value: item._id })
                })
                dispatch({ type: CHANGE_CITY_LIST, payload: cityListTemp })
                dispatch({ type: CHANGE_CITY_VALUE, payload: cityListTemp[0].value })

                let categoryListTemp = []
                categories.data.map(item => {
                    categoryListTemp.push({ label: item.categoryName, value: item._id })
                })
                dispatch({ type: CHANGE_CATEGORY_LIST, payload: categoryListTemp })
                dispatch({ type: CHANGE_CATEGORY_VALUE, payload: categoryListTemp[0].value })

                let conditionListTemp = []
                conditions.data.map(item => {
                    conditionListTemp.push({ label: item.conditionName, value: item._id })
                })
                dispatch({ type: CHANGE_CONDITION_LIST, payload: conditionListTemp })
                dispatch({ type: CHANGE_CONDITION_VALUE, payload: conditionListTemp[0].value })
            } else {
                console.log(cities.data)
                console.log(conditions.data)
                console.log(categories.data)
            }

            dispatch({ type: CHANGE_LOADER, payload: false })
        } catch (e) {
            console.error(e)
        }
    }
}
export const PostProduct = (data) => {
    return async (dispatch) => {
        console.log("PostProduct")
        console.log(data)

        dispatch({ type: CHANGE_LOADER, payload: true })

        let productPosition

        if (GetLocationPermission()) {
            productPosition = await GetLocation().then(position => position)
        }

        console.log("productPosition--->", productPosition)

        const {
            accuracy,
            altitude,
            altitudeAccuracy,
            heading,
            latitude,
            longitude,
            speed,
        } = productPosition?.coords || {}

        const token = store.getState().user.userData.token
        const isForExchange = store.getState().product.isForExchange
        const conditionValue = store.getState().product.conditionValue
        const categoryValue = store.getState().product.categoryValue
        const cityValue = store.getState().product.cityValue
        const productImages = store.getState().product.productImages

        const { productName, price, quantity, description, } = data

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-token", token);

        var raw = JSON.stringify({
            "productName": productName,
            "price": price,
            "forExchange": isForExchange,
            "description": description,
            "categoryId": categoryValue,
            "cityId": cityValue,
            "conditionId": conditionValue,
            "images": productImages,
            "quantity": quantity,
            "longitude": longitude,
            "latitude": latitude,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseURL + "/Api/Product/AddProduct",
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
                dispatch({ type: REMOVE_PRODUCT_IMAGES, payload: null })
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
export const LikeProduct = (productId) => {
    return async (dispatch) => {

        dispatch({ type: LIKE_PRODUCT, payload: productId })

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

        fetch(baseURL + "/Api/Product/LikeProduct",
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
            } else {
                console.error("Something went wrong while liking a product")
            }
        }).catch(error => {
            console.error('error', error)
        })
    }
}
export const GetSellingProducts = () => {
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

            fetch(baseURL + "/Api/Product/GetSellingProducts",
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
                    dispatch({ type: CHANGE_PRODUCTS_TO_SELL, payload: data })
                } else {
                    console.error("Something went wrong while getting selling products")
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
export const GetRequestedExchanges = () => {
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

            fetch(baseURL + "/Api/Product/GetRequestedExchanges",
                requestOptions
            ).then(response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data => ({
                    status: response.status,
                    data,
                }))
            }).then(result => {
                console.log("GETREQUESTEDEXCHANGES RESULT")
                console.log(result)
                const { status, data } = result
                if (status == 200) {
                    dispatch({ type: CHANGE_REQUESTED_EXCHANGES, payload: data })
                } else {
                    console.error("Something went wrong while getting exchanges")
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
export const GetRequestingExchanges = () => {
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

            fetch(baseURL + "/Api/Product/GetRequestingExchanges",
                requestOptions
            ).then(response => {
                console.log("RESPONSE")
                console.log(response)
                return response.json().then(data => ({
                    status: response.status,
                    data,
                }))
            }).then(result => {
                console.log("GETREQUESTINGEXCHANGES RESULT")
                console.log(result)
                const { status, data } = result
                if (status == 200) {
                    dispatch({ type: CHANGE_REQUESTING_EXCHANGES, payload: data })
                } else {
                    console.error("Something went wrong while getting exchanges")
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
export const SearchProducts = () => {
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

            fetch(baseURL + "/Api/Product/SearchProducts?searchQuery=" + store.getState().product.productSearchQuery,
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
                    dispatch({ type: CHANGE_SEARCHED_PRODUCTS, payload: data })
                    store.getState().shared.bottomNavigate('ProductStack', { screen: 'SearchedProducts' })
                } else {
                    console.error("Something went wrong while getting selling products")
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
export const SearchByImage = () => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_LOADER, payload: true })

        let imageData = await ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: false,
            includeBase64: true,
            // multiple: true,
            mediaType: 'photo',
        }).then((image) => {
            return image.data
        }).catch((error) => {
            console.error(error)

        })

        const app = new Clarifai.App({
            apiKey: clarifaiApiKey
        });

        let keywords = await app.models.predict(Clarifai.GENERAL_MODEL, {
            base64: imageData
        }).then((response) => {
            return response.outputs[0].data.concepts
        }).catch(error => {
            console.error("ERROR")
            console.error(error)
            dispatch({ type: CHANGE_LOADER, payload: false })
        })

        keywords = keywords.map(item => item.name)

        console.log("KEYWORDS")
        console.log(keywords)

        const token = store.getState().user.userData.token

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-auth-token", token);

        var raw = JSON.stringify({
            "keywords": keywords
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let products = await fetch(baseURL + "/Api/Product/SearchProductsByKeywords",
            requestOptions
        ).then(response => {
            return response.json().then(data => ({
                status: response.status,
                data,
            }))
        }).catch(error => {
            console.error('ERROR')
            console.error(error)
        })

        if (products.status == 200) {
            dispatch({ type: CHANGE_SEARCHED_PRODUCTS, payload: products.data })
            store.getState().shared.bottomNavigate('ProductStack', { screen: 'SearchedProducts' })
        }
        dispatch({ type: CHANGE_LOADER, payload: false })
    }
}
export const GetExchangeProducts = () => {
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

            fetch(baseURL + "/Api/Product/GetExchangeProducts",
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
                    dispatch({ type: CHANGE_EXCHANGE_TO_SELL, payload: data })
                } else {
                    console.error("Something went wrong while getting exchange products")
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
export const GetMyOrders = () => {
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

            fetch(baseURL + "/Api/Product/GetMyOrders",
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
                    dispatch({ type: CHANGE_ORDERS, payload: data })
                } else {
                    console.error("Something went wrong while getting exchange products")
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
export const GetMyProducts = () => {
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

            fetch(baseURL + "/Api/Product/GetMyProducts",
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
                    dispatch({ type: CHANGE_MY_PRODUCTS, payload: data })
                    dispatch({ type: CHANGE_SHOW_MY_PRODUCTS_PANNEL, payload: true })
                } else {
                    console.error("Something went wrong while getting exchange products")
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
export const GetProductsToExchange = (categoryId) => {
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

            fetch(baseURL + "/Api/Product/GetProductsToExchange?categoryId=" + categoryId,
                requestOptions
            ).then(async response => {
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
                    dispatch({ type: CHANGE_MY_PRODUCTS_TO_EXCHANGE, payload: data })
                    dispatch({ type: CHANGE_SHOW_PRODUCTS_TO_EXCHANGE_PANNEL, payload: true })
                } else {
                    console.error("Something went wrong while getting exchange products")
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
export const GetMyWishList = () => {
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

            fetch(baseURL + "/Api/Product/GetMyWishList",
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
                    dispatch({ type: CHANGE_MY_WISHLIST, payload: data })
                    dispatch({ type: CHANGE_SHOW_WISH_LIST_PANNEL, payload: true })
                } else {
                    console.error("Something went wrong while getting exchange products")
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
export const GetProductById = (productId, navigate) => {
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

            fetch(baseURL + "/Api/Product/GetProductById?productId=" + productId,
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
                    dispatch({ type: CHANGE_PRODUCT_DETAIL, payload: data })
                    dispatch({ type: CHANGE_PRODUCT_DETAIL_IMAGES, payload: data.product.media })
                    var url = `${baseURL}/Api/Product/GetProductsByCategory?categoryId=${data.product.category._id}&currentProductId=${data.product._id}`
                    let productsWithSameCategory = await fetch(url, requestOptions).then(response => response.json().then(data => ({ status: response.status, data, })))
                    dispatch({ type: CHANGE_PRODUCTS_WITHSAME_CATEGORY, payload: productsWithSameCategory.data })
                    navigate("ProductDetail")
                } else {
                    console.error("Something went wrong while getting products detail")
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
export const GetOrderById = (orderId, navigate) => {
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

            fetch(baseURL + "/Api/Product/GetOrderById?orderId=" + orderId,
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
                    dispatch({ type: CHANGE_ORDER_DETAIL, payload: data })
                    navigate("OrderDetail")
                } else {
                    console.error("Something went wrong while getting products detail")
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