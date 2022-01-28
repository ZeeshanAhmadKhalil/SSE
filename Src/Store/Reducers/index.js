import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import chatReducer from './chatReducer'
import colorReducer from './colorReducer'
import productReducer from './productReducer'
import sharedReducer from './sharedReducer'
import userReducer from './userReducer'
import walletReducer from './walletReducer'

export default combineReducers({
    cart: cartReducer,
    chat: chatReducer,
    product: productReducer,
    shared: sharedReducer,
    user: userReducer,
    wallet: walletReducer,
    color: colorReducer,
})