import{Box} from '@mui/material';


//components 
import DataProvider from './context/dataProvider';

import Header from './components/header/Header';
import Home from './components/home/Home';
import DetailView from './components/detail/Detailview.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Cart from './components/cart/cart.jsx';
import PaymentSuccessPage from './components/paymentSuccess/payment_success.jsx';
import MyOrders from './components/Myorders/Myorders.jsx';

function App() {
  return (
    <DataProvider> 
      <BrowserRouter>
          <Header/>
          <Box style={{marginTop:54}}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/product/:id' element={<DetailView/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/payment-success' element={<PaymentSuccessPage/>}/>
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
