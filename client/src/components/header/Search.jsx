import { InputBase,Box,styled,List,ListItem} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {getProducts} from '../../redux/actions/productsAction.js';
import { Link } from "react-router-dom";

const SearchContainer=styled(Box)(({theme})=>({


background:'#fff',
width:'38%',
marginLeft:'10px',
borderRadius:'2px',
display:'flex',

[theme.breakpoints.down('md')]:{
  marginTop:20,
  width:'80%',
  marginLeft:5,
  padding:'0px 4px',
  marginBottom:10
}

}));



const InputSerchBase=styled(InputBase)`
padding-left:10px;
width:100%;
font-size:unset;
`;

const SearchIconWrapper=styled(Box)`
color:blue;
padding:5px;
display:flex;
`;

const ListWrapper=styled(List)`
position:absolute;
background:#FFFFFF;
color:#000;
margin-top:36px;
`


const Search=()=>{

  const[text,SetText]=useState('');

  const {products}=useSelector(state=>state.getProducts);
  const dispatch=useDispatch();

    useEffect(()=>{
    dispatch(getProducts())
     
  },[dispatch])


  const getText=(text)=>{
    SetText(text);
  }

    return(
     <SearchContainer>
      <InputSerchBase placeholder="search for Products,Brands and More"
      onChange={(e)=>getText(e.target.value)}
      value={text}
      />
      

      <SearchIconWrapper>
        <SearchIcon/>
      </SearchIconWrapper>

      {
         text && 
         <ListWrapper>
          {
            products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
              <ListItem><Link style={{textDecoration:'none', color:'inherit'}}to={`/product/${product.id}`} onClick={()=>SetText('')}>{product.title.longTitle}</Link></ListItem>
            ))
          }
         </ListWrapper>
      }
     </SearchContainer>
       
    )  
}

export default Search;