
import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,  
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
} from '../constants/productConstants'

export const listProducts = () => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/api/products/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data 
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail // custom error message received from backend 
                : error.message, // default error messsage    
        })
    }
}

export const listProductDetails = (id) => async(dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data 
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail // custom error message received from backend
                : error.message // default error messsage  
        })
    }
}

export const deleteProduct = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        const {data} = await axios.delete(`http://localhost:8000/api/products/delete/${id}/`, config)  

        dispatch({
            type: PRODUCT_DELETE_SUCCESS, 
        }) 

    }catch(error){
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
} 

export const createProduct = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        // need to fetch access token from userInfo from redux store 
        const {userLogin:{userInfo},} = getState() 

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // includes access token each time to get user details info
            }
        }

        // product gets created in the backend so we only send an empty object with our post request 
        const {data} = await axios.post(`http://localhost:8000/api/products/create/`, {}, config,)  

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,  
            payload: data,  
        }) 

    }catch(error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail 
                : error.message, 
        })
    }
}

