import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL, 
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

