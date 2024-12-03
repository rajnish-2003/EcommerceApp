import axios from 'axios';
import * as actionTypes from '../constants/productsConstants.js';


const URL='http://localhost:8000';

export const getProducts=()=> async(dispatch)=>{

    try{
         const {data}=await axios.get(`${URL}/products`);    // const {data}=response; Object Destructuring
         dispatch({type:actionTypes.GET_PRODUCTS_SUCCESS , payload:data})

    }catch(error)
    {
        dispatch({type:actionTypes.GET_PRODUCTS_FAIL , payload:error.message})
    }
}

export const getProductdetails=(id)=> async(dispatch)=>{
    try{
  
     dispatch({type:actionTypes.GET_PRODUCT_DETAIL_REQUEST});
     
     const {data}=await axios.get(`${URL}/product/${id}`);

     dispatch({type:actionTypes.GET_PRODUCT_DATAIL_SUCCESS , payload:data});
     

    }catch(error)
    {
    
        dispatch({type:actionTypes.GET_PRODUCT_DETAIL_FAIL , payload:error.message});
    }
}