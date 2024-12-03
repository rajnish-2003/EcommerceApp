import { useSelector,useDispatch} from "react-redux";
import { Grid, Typography, Box, styled,Button} from "@mui/material";
import CartItem from "./Cartitem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
//import { post } from "../../utils/paytm";
//import { payUsingPaytm } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { clearCart } from '../../redux/actions/cartAction.js';
import { DataContext } from "../../context/dataProvider.jsx";
import { useContext } from "react";
import { NotLoggedInDialog } from "../login/NotloginDialog.jsx";
import { useState } from "react";
import axios from "axios";

const Container=styled(Grid)(({theme})=>({

    padding:'30px 135px',

    [theme.breakpoints.down('sm')]:{
       padding:'15px 0',
    } 
}))


const Header=styled(Box)`
padding:15px 24px;
background:#fff;
`;

const ButtonWrapper=styled(Box)`
padding:16px 22px;
background:#fff;
box-shadow:0 -2px 10px 0 rgb(0 0 0/ 10%);
border-top:1px solid #f0f0f0;
`;

const StyledButton=styled(Button)`
display:flex;
margin-left:auto;
background:#fb641b;
color:#fff;
width:250px;
height:51px;
border-radius:2px;

`;

const LeftComponent=styled(Grid)(({theme})=>({
paddingRight:15,

[theme.breakpoints.down('md')]:{

    marginBottom:15,
}

}));



const Cart = () => {

  const { CartItems } = useSelector((state) => state.cart);

  const navigate=useNavigate();
  const {account}=useContext(DataContext);
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const {user}=useContext(DataContext);
  const {setQuantity}=useContext(DataContext);


  const handleClose = () => {
    setOpen(false);
  };


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

      const productIds = CartItems.map(item => item.id);
         
      const n=productIds.length;
  
      for (let i = 0; i < n; i++) {  
    
          try {

            const response = await axios.post(`http://localhost:8000/api/user/add-product`, {
                username: user,  
                productId: productIds[i]
            });
  
            if (response.status === 200) {
                dispatch(clearCart());
                setQuantity(1);
                navigate('/payment-success');
            }
        } catch (error) {
            console.error("Failed to add product to user's purchased list:", error);
        }
     
      }
    }
      else {
        setOpen(true);
      }
            
       
}

  return (
    <>
      {CartItems.length ? (
        <Container container>

          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart({CartItems.length})</Typography>
            </Header>

            {CartItems.map((item) => (
              <CartItem  item={item}/>
            ))}
             <ButtonWrapper><StyledButton onClick={()=> buyNow()}>Place Order</StyledButton></ButtonWrapper>
          </LeftComponent>
          <NotLoggedInDialog open={open} handleClose={handleClose} />

          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView item={CartItems}/>
          </Grid>

        </Container>
      ) : (
        <EmptyCart/>
      )}
    </>
  );
};

export default Cart;
