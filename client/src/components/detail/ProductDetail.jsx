import { Box, Typography,styled,Button, TableBody, TableRow, TableCell} from "@mui/material";
import {LocalOffer as Offer} from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import {Table} from '@mui/material';

const ProductDetail = ({ product }) => {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";


    const SmallText=styled(Box)`
     
    font-size:14px;
    margin-top:10px;
    vertical-align:baseline;
    & > p{
            font-size:14px;   
            margin-top:10px;
    }
`;

const Badge=styled(Offer)`
margin-right:10px;
color:#00CC00;
font-size:15px;
`;

const ColoumText=styled(TableRow)`
font-size:14px;
vertical-align:baseline;
 & > td{
            font-size:14px;   
            margin-top:10px;
            border:none;
    }
`;

const Wrapper=styled(Box)(({theme})=>({

  marginLeft:0,

  [theme.breakpoints.down('lg')]:{
    marginLeft:'20px'
  }

}));

const date= new Date(new Date().getTime()+(5*24*60*60*1000));
const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

  return (
    <>
    <Wrapper>
    
      <Typography>{product.title.longTitle}</Typography>

      <Typography style={{ color: "#878787", marginTop: 5, fontSize: 14 }}>
        <Button style={{background:'#388E3C',borderRadius:16,color:'#FFFFFF',marginRight:3,height:25,width:20}}>4.3<StarIcon style={{width:15,height:15}}/></Button>
        4 Rating & 1 Review
        <Box component="span">
          <img
            src={fassured}
            alt="fassured"
            style={{ width: 77, marginLeft: 20 }}
          />
        </Box>
      </Typography>

      <Typography>
        <Box component="span" style={{ fontSize: 28 }}>
          ₹{product.price.cost}
        </Box>
        &nbsp;&nbsp;
        <Box component="span" style={{ color: "#878787" }}>
          <strike>₹{product.price.mrp}</strike>
        </Box>
        &nbsp;&nbsp;
        <Box component="span" style={{ color: "#388E3C" }}>
          {product.price.discount}
        </Box>
        &nbsp;&nbsp;
      </Typography>
      </Wrapper>

      <Wrapper>
      <Typography style={{color:'solid #212121'}}>Available Offers</Typography>
      </Wrapper>

      <Typography>
        <Wrapper>
        <SmallText>
          <Typography><Badge/>Get extra 20% off upto ₹50 on 1 item(S) T&C </Typography>
          <Typography><Badge/>
            Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit
            CardT&C
          </Typography>
          <Typography><Badge/>
            No cost EMI ₹2,882/month. Standard EMI also available
          </Typography>
          <Typography><Badge/>
            Bank OfferGet Up to ₹200 discount on Flipkart UPI txnsT&C
          </Typography>
          <Typography><Badge/>
            Bank Offer 10% off up to ₹2,000 on HSBC Bank Credit Card EMI
            Transactions, on orders of ₹5,000 and aboveT&C
          </Typography>
          <Typography><Badge/>
            Partner OfferMake a purchase and enjoy a surprise cashback/ coupon
            that you can redeem later!Know More
          </Typography>
          
        </SmallText>
        </Wrapper>

        <Table>
          <TableBody>
            <ColoumText>
                <TableCell style={{color:'#878787'}}> Delivery</TableCell>
                <TableCell style={{fontWeight:600}}>Deliver by {date.toDateString()} | ₹40</TableCell>
            </ColoumText>

            <ColoumText>
                <TableCell style={{color:'#878787'}}>Warranty</TableCell>
                <TableCell>No Warranty</TableCell>
            </ColoumText>

            <ColoumText>
                <TableCell style={{color:'#878787'}}>Seller</TableCell>
                <TableCell><Box componenet="span"  style={{color:'#2874f0'}}>SuperComNet</Box>
                <Typography>GST invoice available</Typography>
                <Typography>View more sellers starting from  ₹{product.price.cost}</Typography>
                </TableCell>
            </ColoumText>

            <ColoumText>
                <TableCell colSpan={2}><img src={adURL} alt ="supercoin" style={{width:390}}/></TableCell>
            </ColoumText>

            <ColoumText>
                <TableCell style={{color:'#878787'}}>Description</TableCell>
                <TableCell>{product.description}</TableCell>
            </ColoumText>

          </TableBody>
        </Table>
      </Typography>
   
    </>
  )
};

export default ProductDetail;
