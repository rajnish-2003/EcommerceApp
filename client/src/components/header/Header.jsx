import { AppBar, Toolbar, styled,Typography,Box, IconButton,Drawer,List,ListItem} from "@mui/material";
import {Menu} from '@mui/icons-material';
import { useState } from "react";

//components

import Search from './Search';
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";




const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;

const Component = styled(Link)`
margin-left:12%;
line-height:0;
`;

const SubHeading=styled(Typography)`
font-size:10px;
font-style:italic;`;


const CustomButtonWrapper=styled(Box)(({theme})=>({

  margin:'0 5% 0 auto',
   [theme.breakpoints.down('md')]:{
    display:'none'

   }
}));

const Image=styled('img')(({theme})=>({

  width:75,
   [theme.breakpoints.down('md')]:{
   
    marginBottom:5
   }
}));

const MenuButton=styled(IconButton)(({theme})=>({

    display:'none',
   [theme.breakpoints.down('md')]:{
   
      display:'block'
   }
}));





const Plus=styled('img')(({theme})=>({  //change
  width:10,
  marginLeft:3,
   
    [theme.breakpoints.down('lg')]:
    {
      display:'none'
    }
}))

const Header = () => {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

  const [open,Setopen]=useState(false);

  const handleOpen=()=>{
    Setopen(true);
  }

  const handleClose=()=>{
    Setopen(false);
  }


  const list=()=>{

    return (
      
          <Box style={{width:150}} onClick={handleClose}>
           <List>
              <ListItem button><CustomButton/></ListItem>
           </List>
         </Box>
    )
   
  }



  return (
    <StyledHeader>
      <Toolbar style={{minHeight:55}}>
        <MenuButton color='inherit' onClick={handleOpen}>
        <Menu/>
        </MenuButton>
        <Drawer open={open} onClose={handleClose}>
         {list()}
        </Drawer>
        <Component to={`/`} style={{textDecoration:'none', color:'inherit'}}>

        <Image src={logoURL} alt="logo" style={{width:75}}/>
        <Box>
            <subHeading>Explore&nbsp;
            <Box component="span" style={{color:"#FFE500"}}>Plus</Box>
            </subHeading>
            <Plus src={subURL} alt="sublogo"/>
        </Box>
       
        </Component> <Search/>
        <CustomButtonWrapper> <CustomButton/></CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
   
  );
};

export default Header;
