import { Box,Button,styled } from "@mui/material";

import {ShoppingCart as Cart,FlashOn as Flash} from '@mui/icons-material/';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddtoCart, clearCart } from "../../redux/actions/cartAction";
import { useState } from "react";
import { DataContext } from "../../context/dataProvider.jsx";
import { useContext } from "react";
import { NotLoggedInDialog } from "../login/NotloginDialog.jsx";
import axios from "axios";

//import { payUsingPaytm } from "../../service/api";
//import { post } from "../../utils/paytm";


const LeftContainer=styled(Box)(({theme})=>({
minWidth:'40%',
padding:'40px 0 0 80px',

  [theme.breakpoints.down('md')]:{
    padding:'20px 40px'
  }

}));

const Image=styled('img')({
    width:'95%',
    padding:'15px',
   
});

const StyledButton=styled(Button)`
width:46.2%;
height:45px;
border-radius:2px;
margin-top:10px;
`;


const ActionItem=({product})=>{


  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {id}=product;
  
  const [quantity,SetQuantity]=useState(1);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const addItemtoCart=()=>{

    dispatch(AddtoCart(id,quantity));
     navigate('/cart');
  }

  const {account}=useContext(DataContext);
  const {user}=useContext(DataContext);

   const buyNow=async()=>{
     /*let response=await payUsingPaytm({amount:500, email:'codeforinterview01@gmail.com'});

    console.log('Paytm response:', response); // Debugging line

    if (!response || typeof response !== 'object') {
        console.error('Invalid response from payUsingPaytm:', response);
        return;
    }

    let information={
      action:'https://securegw-stage.paytm.in/order/process',
      params:response
    }

    post(information);*/


    if (account && account.length>0) {
      try {

         
          const response = await axios.post(`http://localhost:8000/api/user/add-product`, {
              username: user,  
              productId: id
          });

          if (response.status === 200) {
              dispatch(clearCart());
              navigate('/payment-success');
          }
      } catch (error) {
          console.error("Failed to add product to user's purchased list:", error);
      }
  } else {
      setOpen(true);
  }
}


    return (
       <LeftContainer>
        <Image src={product.detailUrl} alt="productImage" style={{padding:'15px 20px',border:'1px solid #f0f0f0', width:'85%'}}/>
        <StyledButton onClick={()=>addItemtoCart()} variant="contained" style={{marginRight:10,background:'#ff9f00'}}><Cart/>Add to Cart</StyledButton>
        <StyledButton onClick={()=> buyNow()}  variant="contained" style={{background:'#fb541b'}}><Flash/>By Now</StyledButton>
        <NotLoggedInDialog open={open} handleClose={handleClose} />
       </LeftContainer>
    )

  };
export default ActionItem;