import { Typography,Box,styled,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Component=styled(Box)(({theme})=>({

    width:'80%',
    height:'65vh',
    background:'#fff',
    margin:'80px 140px',

    [theme.breakpoints.down('md')]:{
       width:'70%',
       height:'55vh',
       marginLeft:50,
    }
}))


const Container=styled(Box)`
text-align:center;
padding-top:70px;`

const ShopButton=styled(Button)`
background:#2874f0;
color:#fff;
margin-top:15px;
width:180px;
font-size:14px;
font-weight:400;
`

const EmptyCart = () => {


    const navigate = useNavigate(); 

  const handleShopNowClick = () => {
    navigate('/'); 
  };
  const imgurl =
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";

  return (
    <Component>
      <Container>
        <img src={imgurl} alt="emptycart" style={{width:'19%'}} />
        <Typography>Your cart is empty!</Typography>
        <Typography style={{fontSize:14,color:'#878787',marginTop:10}}>Add items to it now.</Typography>
        <ShopButton onClick={handleShopNowClick}>Shop now</ShopButton>
      </Container>
    </Component>
  );
};

export default EmptyCart;
