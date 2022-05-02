import {
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './Reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {}
const middlewares = [thunk]
const persistConfig = {
    key: 'root',
    whitelist: ['home'],
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
}


const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middlewares)
)

export default store