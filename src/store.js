import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer, 
    productDetailsReducer, 
    productDeleteReducer, 
    productCreateReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer,
    userListReducer, 
    userDeleteReducer, 
    userUpdateReducer,
} from './reducers/userReducers'

import { 
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
    orderMyOrdersReducer, 
} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer, 
    productDelete : productDeleteReducer,
    productCreate: productCreateReducer, 

    cart: cartReducer,

    userLogin: userLoginReducer, 
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer, 
    userUpdateProfile: userUpdateProfileReducer, 
    userList: userListReducer, 
    userDelete: userDeleteReducer, 
    userUpdate: userUpdateReducer, 

    orderCreate: orderCreateReducer, 
    orderDetails: orderDetailsReducer,  
    orderPay: orderPayReducer,
    orderMyOrders: orderMyOrdersReducer,   
})

// if any user info and cart items already exists then load it otherwise load an empty array
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}  

// start application state with pulling cart items and user info from local storage
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage, 
    },
    userLogin: {
        userInfo: userInfoFromStorage,  
    }
} 

const middleware = [thunk] 

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))   

export default store 
