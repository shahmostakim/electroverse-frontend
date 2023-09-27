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
 } from '../constants/userConstants'

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
    dispatch({
        type: USER_LOGOUT
    }) 
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

        //const {data} = await axios.get('http://localhost:8000/api/users/profile/', config) // invalid
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
