

//components
import NavBar from './NavBar';
import Banner from './Banner';
import Slide from './slides.jsx';
import MidSlide  from './midSlide.jsx';
import MidSection from './Midsection.jsx';

import {useEffect} from 'react';
import {styled,Box} from '@mui/material';
import {getProducts} from '../../redux/actions/productsAction.js';
import {useDispatch,useSelector} from 'react-redux';

const Component=styled(Box)`
padding:10px;
background:#F2F2F2;`

const Home=()=>{

    const {products}=useSelector(state=>state.getProducts);
    const dispatch=useDispatch();

    useEffect(()=>{
       dispatch(getProducts())

    },[dispatch])        //[] empty array is the condition of component didmount

    return(
        <>
         <NavBar/>
         <Component>
         <Banner/>
         <MidSlide products={products} title="Deal of the Day" timer={true}/>
         <MidSection/>
         <Slide products={products} title="Discounts for You" timer={false}/>
         <Slide products={products} title="Suggesting Items" timer={false}/>
         <Slide products={products} title="Top Selection" timer={false}/>
         <Slide products={products} title="Recommended Items" timer={false}/>
         <Slide products={products} title="Trending offers" timer={false}/>
         <Slide products={products} title="Season's top picks" timer={false}/>
         <Slide products={products} title="Top deals on Accessories" timer={false}/>
         </Component>
         
        </>
      
    )
}

export default Home;