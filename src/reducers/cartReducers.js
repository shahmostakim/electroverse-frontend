
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (state={cartItems:[], shippingAddress:{}}, action)=>{ 
    switch (action.type){
        case CART_ADD_ITEM: 
            const item = action.payload
            const existItem = state.cartItems.find(x=>x.productId===item.productId)
            if(existItem){ // item exists in cart already 
                return{
                    ...state,
                    /* replaces the existing cart item with the updated item coming from action payload */
                    cartItems: state.cartItems.map(x=>x.productId===existItem.productId?item:x)
                } 
            }else{ // item was not added to cart before 
                return{
                    ...state,
                    /* action payload is simply added to cartItems array */
                    cartItems:[...state.cartItems, item] 
                }
            }
        case CART_REMOVE_ITEM: 
            return{
                ...state,
                cartItems: state.cartItems.filter(x=>x.productId !== action.payload) // product ID is sent through action payload 
            }

        case CART_SAVE_SHIPPING_ADDRESS: 
            return {
                ...state,
                shippingAddress: action.payload 
            }

        case CART_SAVE_PAYMENT_METHOD: 
            return {
                ...state,
                paymentMethod: action.payload   
            }

        case CART_CLEAR_ITEMS: 
            return {
                //...state,
                //cartItems: [],
                //shippingAddress: []
            }
             
        default: 
            return state 
    }
}

