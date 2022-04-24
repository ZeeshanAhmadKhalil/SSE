import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]

import rootReducer from './Reducers'
const initialState = {}

if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
}


const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
)

export default store