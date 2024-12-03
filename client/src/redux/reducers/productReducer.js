import * as actionType from '../constants/productsConstants.js';

 
export const getProductReducer=(state={products:[]},action)=>{

    switch(action.type)
    {
        case actionType.GET_PRODUCTS_SUCCESS:
          return({products:action.payload});
        case actionType.GET_PRODUCTS_FAIL:
            return({error:action.payload});

        default:
            return state;
    }
}

export const getProductDetailsReducer=(state={product:{}},action)=>{

    switch(action.type)
    {
        case actionType.GET_PRODUCT_DETAIL_REQUEST:
            return {loading:true}

        case actionType.GET_PRODUCT_DATAIL_SUCCESS:
            return {product:action.payload,loading:false}

        case actionType.GET_PRODUCT_DETAIL_FAIL:
            return  {loading:false,error:action.payload}

        case actionType.GET_PRODUCT_DETAIL_RESET:
            return {product:{}}
           
            default:
                return state;
    }
}