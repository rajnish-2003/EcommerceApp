import * as ActionType from '../constants/cartConstant.js';




export const CartReducer=(state= {CartItems:[]},action) => {

    switch(action.type)

    {
        case ActionType.ADD_TO_CART:
             const item=action.payload;
             const exist=state.CartItems.find(product=> product.id===item.id);

             if(exist)
             {
                return {...state,CartItems:state.CartItems.map(data=>data.product === exist.product ? item : data)};
             }
             else{
                return {...state,CartItems:[...state.CartItems,item]}
             }

         case ActionType.REMOVE_FROM_CART:

         return{...state,CartItems:state.CartItems.filter(product=>product.id!== action.payload)}

         case ActionType.CLEAR_CART:
            return {
                ...state,
                CartItems: [],
              };

         default: 
         return state;
    }

}



  
