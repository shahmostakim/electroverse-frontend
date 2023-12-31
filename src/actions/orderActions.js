import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_MYORDERS_REQUEST,
    ORDER_MYORDERS_SUCCESS,
    ORDER_MYORDERS_FAIL,
    ORDER_MYORDERS_RESET,
} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

import axios from 'axios'

export const createOrder = (order) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.post(`http://localhost:8000/api/orders/add/`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,  
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,  
        })

        localStorage.removeItem('cartItems') 

    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.get(`http://localhost:8000/api/orders/${id}/`, config) 

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,  
        }) 

    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 

export const getMyOrders = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_MYORDERS_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.get(`http://localhost:8000/api/orders/myorders/`, config)  

        dispatch({
            type: ORDER_MYORDERS_SUCCESS,
            payload: data,  
        }) 

    }catch(error){
        dispatch({
            type: ORDER_MYORDERS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 

export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.put(`http://localhost:8000/api/orders/${id}/pay/`, paymentResult, config) 

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,    
        }) 

    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 

