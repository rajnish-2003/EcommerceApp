import React from 'react';
import { Box, Typography, styled ,Grid,Button} from '@mui/material';
import { useSelector } from 'react-redux';
import { useContext } from "react";
import { DataContext } from '../../context/dataProvider';
import { AddEllipsis } from "../../utils/commonUtils";
import { useNavigate } from 'react-router-dom';
 


const OuterContainer = styled(Box)`
  padding: 20px;
  max-width: 1200px;
  margin: 100px auto;
  border: 1px solid #ddd; /* Add a border around the whole content */
  border-radius: 0px;
  background-color: #fff;
  
`;

const Container = styled(Box)`
  padding: 20px;
  max-width: 1200px;
  margin:10px auto;
  
`;

const ProductCard = styled(Box)`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px; /* Set a fixed height for the card */
  max-width: 250px; /* Set a maximum width for the card */
  margin: 0 auto; /* Center the card horizontally */
`;

const ProductImage = styled('img')`
  width: 80%; /* Decrease the width of the image */
  height: auto;
  max-width: 150px; /* Set a maximum width for the image */
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProductTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductPrice = styled(Typography)`
  color: #2874f0;
  font-size: 16px; /* Adjust font size */
  margin-bottom: 10px;
`;

const TextWrapper=styled(Typography)`
font-size:25px;
margin:20px 5px;
`

const ProductDiscription=styled(Typography)`
color:#878787;`

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
}));

const Containers=styled(Box)`
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



const MyOrders = () => {
  const { products } = useSelector(state => state.getProducts);
  const { order } = useContext(DataContext);

  const navigate = useNavigate(); 
  const handleShopNowClick = () => {
    navigate('/'); 
  };

  if (!order.length || !products.length) {
    return ( <Component>
        <Containers>
          <img src='no.png' alt="emptycart" style={{width:'19%'}} />
          <Typography style={{fontSize:14,color:'#878787',marginTop:10}}>Order now to get extra discounts !</Typography>
          <ShopButton onClick={handleShopNowClick}>Order now</ShopButton>
        </Containers>
      </Component>);
  }

  const orderedProducts = order.map(productId =>
    products.find(product => product.id === productId)
  ).filter(product => product); // Filter out undefined products

  return (
    <OuterContainer>
    <Container>
      <TextWrapper  style={{color:'#212121'}}>My Orders</TextWrapper>
      <Grid container spacing={2} justifyContent="center">
        {orderedProducts.slice().reverse().map((product) => (
          <Grid item key={product.id}>
            <ProductCard>
              <ProductImage src={product.url} alt={product.title.shortTitle} />
              <ProductTitle variant="h6">{product.title.shortTitle}</ProductTitle>
              <ProductPrice>Price: ₹{product.price.cost}</ProductPrice>
              <ProductDiscription>{AddEllipsis(product.title.longTitle)}</ProductDiscription>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
    </OuterContainer>
  );
};

export default MyOrders;
