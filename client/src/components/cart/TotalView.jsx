import { Typography,Box,styled } from "@mui/material";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/dataProvider";

const Header=styled(Box)`
padding:15px 24px;
background:#fff;
border-bottom:1px solid #f0f0f0;
`;

const Heading=styled(Typography)`
color:#878787;
`;

const Container=styled(Box)`
padding:15px 24px;
background:#fff;

  & > p{
       margin-bottom:20px;
       font-size:14px;
   }
    & > h6{
        margin-bottom:20px;
    }

`;

const Discount=styled(Typography)`
color:green;
`


const Price=styled(Box)`

float:right;
font-Weight:550;
`;



const TotalView=({item})=>{


    const [price,Setprice]=useState(0);
    const [discount,SetDiscount]=useState(0);
    const {Quantity}=useContext(DataContext);

    useEffect(()=>{
        TotalAmount();
    },[item])

    const TotalAmount=()=>{
        let price=0,discount=0;

         item.map(items=>{
            price+= items.price.mrp;
            discount+= (items.price.mrp - items.price.cost);
        });

        Setprice(price);
        SetDiscount(discount);
    }

    return(

      <Box>
        <Header><Heading>PRICE DETAILS</Heading></Header>
        <Container>
            <Typography>Price  ({item?.length}  item)
              <Price component="span">₹{price*Quantity}</Price>
            </Typography>

            <Typography>Discount
              <Price component="span">-₹{discount*Quantity}</Price>
            </Typography>

            <Typography>Delivery Charges
              <Price component="span">₹40</Price>
            </Typography>

            <Typography variant="h6">Total Amount
              <Price component="span">₹{price*Quantity-discount*Quantity + 40}</Price>
            </Typography>

            <Discount>You will save ₹{discount*Quantity - 40} on this order</Discount>
           
        </Container>
      </Box>
    )
}

export default TotalView;