import { Box,Typography,styled,Button } from "@mui/material";
import { AddEllipsis } from "../../utils/commonUtils";
import { useDispatch } from "react-redux";
import GroupedButton from './ButtonGroup.jsx';
import { RemovefromCart } from "../../redux/actions/cartAction.js";

const Component=styled(Box)`

border-top:1px solid #f0f0f0;
display:flex;
background:#fff;
`;

const LeftComponent=styled(Box)`
margin:20px;
display:flex;
flex-direction:column;`;

const SmallText=styled(Typography)`
color:#878787;
font-size:14px;
margin-top:10px;
`;

const Remove=styled(Button)`
margin-top:20px;
font-size:15px;
color:#000;
font-weight:600;`


const CartItem=({item})=>{

     const dispatch=useDispatch();

    const removeItemFromcart=(id)=>{
       dispatch(RemovefromCart(id))
    }

    const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

    return(
       <Component>
        <LeftComponent>
            <img src={item.url} alt="item" style={{height:135, width:135}}/>
            <GroupedButton/>
        </LeftComponent>
        <Box style={{margin:20}}>
            <Typography>{AddEllipsis(item.title.longTitle)}</Typography>
            <SmallText>Seller:RetailNet
            <Box component="span"><img src={fassured} alt="flipKart" style={{marginLeft:10,width:50}}/></Box>
            </SmallText>
        <Typography style={{margin:'20px 0'}}>
            <Box component="span" style={{ fontWeight:600,fontSize:18 }}>
                ₹{item.price.cost}
            </Box>&nbsp;&nbsp;
            
            <Box component="span" style={{ color: "#878787" }}>
            <strike>₹{item.price.mrp}</strike>
            </Box>&nbsp;&nbsp;
            
            <Box component="span" style={{ color: "#388E3C" }}>
            {item.price.discount}
            </Box>&nbsp;&nbsp;
      </Typography>
      <Remove onClick={()=>removeItemFromcart(item.id)}>Remove</Remove>
            
        </Box>
       </Component>
    )
}


export default CartItem;