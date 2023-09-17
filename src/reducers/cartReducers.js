
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state={cartItems:[]}, action)=>{
    switch (action.type){
        case CART_ADD_ITEM: 
            const item = action.payload
            const existItem = state.cartItems.find(x=>x.product===item.product)
            if(existItem){ // item exists in cart already 
                return{
                    ...state,
                    /* replaces the existing cart item with the updated item coming from action payload */
                    cartItems: state.cartItems.map(x=>x.product===existItem.product?item:x)
                } 
            }else{ // item was not added to cart before 
                return{
                    ...state,
                    /* action payload is simply added to cartItems array */
                    cartItems:[...state.cartItems, item] 
                }
            }
             
        default: 
            return state 
    }
}
