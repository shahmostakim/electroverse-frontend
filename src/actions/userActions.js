import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET, 

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET, 

 } from '../constants/userConstants'

 import { ORDER_MYORDERS_RESET } from '../constants/orderConstants'
 import { CART_CLEAR_ITEMS } from '../constants/cartConstants' 

import axios from 'axios'


export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('http://localhost:8000/api/users/login/',{'username': email, 'password': password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,  
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('shippingAddress') 

    dispatch({ type: USER_LOGOUT }) 
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LIST_RESET }) 
    dispatch({ type: USER_DELETE_RESET }) 

    dispatch({ type: ORDER_MYORDERS_RESET }) 
    dispatch({ type: CART_CLEAR_ITEMS })
}

export const register = (name, email, password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post('http://localhost:8000/api/users/register/',{'name': name, 'email': email, 'password': password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,  
        }) 

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,  
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 


export const getUserDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.get(`http://localhost:8000/api/users/${id}/`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,  
        }) 

    }catch(error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.put(`http://localhost:8000/api/users/profile/update/`,user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,  
        })
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,  
        }) 

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 


export const listUsers = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.get(`http://localhost:8000/api/users/`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,  
        })

    }catch(error){
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 


export const deleteUser = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: USER_DELETE_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState()  

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.delete(`http://localhost:8000/api/users/delete/${id}/`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,  
        })

    }catch(error){
        dispatch({
            type: USER_DELETE_FAIL,
            // if error message from server has a description then show it, 
            // otherwise show the generic error status code 
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    } 
} 
