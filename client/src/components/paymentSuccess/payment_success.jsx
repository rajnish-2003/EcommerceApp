import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button , styled} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const ButtonWrapper=styled(Button)`
background:#2874f0;
color:#fff;
margin-top:15px;
width:170px;
font-size:13px;
font-weight:400;
textTransform:'none',`


const PaymentSuccessPage = () => {
  
  const now = new Date();
  const formattedDate = format(now, 'MMMM dd, yyyy');
  const formattedTime = format(now, 'hh:mm a');
  const navigate=useNavigate();

  const gotoHome=()=>{
    navigate('/');
  }

  return (
   
    <Container maxWidth="sm" style={{ marginTop: '8rem' }}>
        
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" color="success.main">
            Payment Successful
          </Typography>
          <Typography variant="body1" component="div" style={{ marginTop: '1rem' }}>
            Thank you for your payment. Your transaction was completed successfully.
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginTop: '1rem' }}>
            Date: {formattedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Time: {formattedTime}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonWrapper onClick={()=>gotoHome()} >
            Go to Homepage
          </ButtonWrapper>
        </CardActions>
      </Card>
      
    </Container>

     
  );
};

export default PaymentSuccessPage;
