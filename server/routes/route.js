import express from 'express';
import { userSignup,userLogin } from '../controller/user-controller.js';
import { getProducts,getProductByid } from '../controller/product-controller.js';
import { AddProducttoUser,getUser } from '../controller/user-controller.js';

//import { addPaymentGateway,PaytmResponse } from '../controller/payment-controller.js';

const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

router.get('/products',getProducts);
router.get('/product/:id',getProductByid)

//router.post('/payment',addPaymentGateway);
//router.post('/callback',PaytmResponse);


router.post('/api/user/add-product',AddProducttoUser)
router.get('/api/user/orders/:username',getUser)
    

export default router;