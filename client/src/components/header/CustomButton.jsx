import { Badge, Box, Button, Typography,styled } from "@mui/material";
import {ShoppingCart as Scart} from '@mui/icons-material';
import { useState,useContext } from "react";

import { DataContext } from "../../context/dataProvider";
import { useSelector } from "react-redux";

//components
import LoginDialog from "../login/LoginDialog";
import Profile from "./profile.jsx";
import { Link } from "react-router-dom";


const Wrapper=styled(Box)(({theme})=>({

  display:'flex',
  marginLeft:'0 3% 0 auto',
  alignItems:'center',

   '& > button, & > p, & > div':{
    marginRight:40,
    fontSize:16
  },

  [theme.breakpoints.down('md')]:{
    display:'block',

  }

}));

const MyWrapper=styled(Typography)(({theme})=>({

  marginLeft:5,
  [theme.breakpoints.down('md')]:{
    marginTop:30

  }

}));

const Cart=styled(Scart)(({theme})=>({

  [theme.breakpoints.down('md')]:{
    marginTop:30

  }

}));


const Container=styled(Link)`

 display:flex;
 text-decoration:none;
 color:inherit
`;

  

const LoginButton=styled(Button)(({theme})=>({ //change


    color:'#2874f0',
    background:'#ffffff',
    textTransform:'none',
    padding:'5px 40px',
    borderRadius:'2px',
    boxShadow:'none',
    fontWeight:'600',
    height:'30px',

    [theme.breakpoints.down('xl')]:{
      marginLeft:4
    }

}));


const CustomButton = () => {


  const[open,setOpen]=useState(false);

  const {account,setAccount}=useContext(DataContext);

  const openDialog=()=>{
    setOpen(true);
  }

  const {CartItems}=useSelector(state=>state.cart);
  

  return (
    <Wrapper>
      {
        account ? <Profile account={account} setAccount={setAccount}/>:
        <LoginButton variant="contained" onClick={()=>{openDialog()}}>Login</LoginButton>
      }
       
     
      <MyWrapper styled={{marginTop:3,width:135}}>Become a Seller</MyWrapper>
      <MyWrapper styled={{marginTop:3}}>More</MyWrapper>

      <Container to="/cart">
      <Badge badgeContent={CartItems?.length} color="secondary">
          <Cart/>
      </Badge>
        
        <MyWrapper>Cart</MyWrapper>
      </Container>
      <LoginDialog open={open} setOpen={setOpen}/>
    </Wrapper>
  );
};

export default CustomButton;
