import axios from 'axios';
import * as ActionType from '../constants/cartConstant.js';


const URL='http://localhost:8000';

export const AddtoCart=(id,quantity)=>async(dispatch)=>{

    try{

        const {data}=await axios.get(`${URL}/product/${ id}`);

        dispatch({type:ActionType.ADD_TO_CART, payload:{...data,quantity}});


    }catch(error)
    {
       dispatch({type:ActionType.ADD_TO_CART_ERROR,payload:error.message})
    }

}




export const RemovefromCart=(id)=>(dispatch)=>{

    dispatch({type:ActionType.REMOVE_FROM_CART,payload:id})

}

export const clearCart = () =>(dispatch) =>{
    dispatch({type: ActionType.CLEAR_CART})
  }