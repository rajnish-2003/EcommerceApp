import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";

import {useState,useContext} from 'react';
import { DataContext } from "../../context/dataProvider.jsx";

import { authenticateSignup, authenticateLogin } from "../../service/api";




const Component = styled(Box)(({theme})=>({  //change

  height: '70vh',
  width: '90vh',

  [theme.breakpoints.down('lg')]:{
    
    height: '60vh',
    width: '60vh',
  }
}));
  

const Image = styled(Box)(({theme})=>({  //change

  background:'#2874f0  url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) no-repeat center 85%',
height:'89.5%',
width:'28%',
padding:'45px 35px',
'& >p, & >h5':{
color:'#FFFFFF',
 fontWeight:600,
},
   
   [theme.breakpoints.down('md')]:{
    display:'none'
   }

}));


const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;

  & > div,
  button,p
  {
    margin-top: 17px;
  }
`;

const CreateWrapper = styled(Box)(({theme})=>({  //change

  display:'flex',
  flexDirection:'column',
  padding:'25px 35px',
  flex: 1,
  marginTop:'-20px',

    '& > div, button,p':
    {
      marginTop:17,
    },

     [theme.breakpoints.down('md')]:{

      '& > div, button,p':
      {
        marginTop:10,
      }
     
     }
}));

const LoginButton=styled(Button)(({theme})=>({   //change
  textTransform:'none',
  borderRadius:'2px',
  color:'#fff',
  background:'#FB641B',
  height:'48px',

   [theme.breakpoints.down('md')]:{
    width:'35%',
    height:25,
 
    
   }

}));


const RequestOTP=styled(Button)(({theme})=>({  //change
 
 textTransform:'none',
 borderRadius:'2px',
 color:'#2874f0',
 background:'#fff',
 height:'48px',
 boxShadow:'0 2px 4px 0 rgb(0 0 0/20%)',

  [theme.breakpoints.down('md')]:{
    width:'35%',
  
  }
 
}));

const Text=styled(Typography)`
  font-size:12px;
  color:#878787;
`

const CreateAccount=styled(Typography)(({theme})=>({  //change
  fontWeight:600,
  color:'#2874f0',
  cursor:'pointer',
  textAlign:'center',
  fontSize:'14px',
 
  [theme.breakpoints.down('md')]:{
    marginRight:400
  }
    
}));

const Or=styled(Typography)(({theme})=>({ //change


  [theme.breakpoints.down('md')]:{
    marginRight:550
  }
}));

const TextChange=styled(Text)(({theme})=>({ //change


  [theme.breakpoints.down('md')]:{
    marginRight:370
  }
}));


const Error=styled(Typography)`
  font-size:10px;
  color:#ff6161;
  line-height:0;
  margin-top:10px;
  font-weight:600;
`

const accountInitialvalue={   // object
   login:{
    view:'login',
    Heading:'Login',
    SubHeading:'Get access to your Orders, Wishlist and Recommendations'
   },
   signup:{
    view:'signup',
    Heading:"Looks like You're new here!",
    SubHeading:'Sign up with your mobile number to get started'
   }
}

const signupInitialvalue={
  firstname:'',
  lastname:'',
  username:'',
  email:'',
  password:'',
  phone:''
}

const loginInitialvalue={
  username:'',
  password:''
}

const LoginDialog = ({ open, setOpen }) => {

  //useStates

  const [account,toggleAccount]= useState(accountInitialvalue.login) 
  const[signup,setSignup]=useState(signupInitialvalue);
  const[login,setLogin]=useState(loginInitialvalue);
  const[error,setError]=useState(false);


  //context

  const {setAccount}=useContext(DataContext);
  const {setUser}=useContext(DataContext);
  const {SetOrders}=useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialvalue.login);
    setError(false);
  };


  const toggleSignup=()=>{
    toggleAccount(accountInitialvalue.signup)
  }

  const oninputChange=(e)=>{
     setSignup({...signup,[e.target.name]: e.target.value})
     
  }

  const signupUser=async()=>{
     let response= await authenticateSignup(signup); // POST API
        
     if(!response) return;

     else{
        handleClose();
        setAccount(signup.firstname);
     }
       
    }

    const onvalueChange=(e)=>{
       setLogin({...login,[e.target.name]: e.target.value})
    }

    const loginUser=async()=>{

        let response= await authenticateLogin(login); // POST API
          
        if(response.status===200) 
        {
          handleClose();
          setAccount(response.data.data.firstname);
          setUser(response.data.data.username);
          SetOrders(response.data.data.purchasedProducts)
        }
  
        else{
           setError(true);
        }
        
    }

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{sx:{maxWidth:'100%',overflow:'hidden'}}}>
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.Heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.SubHeading}
            </Typography>
          </Image>
       { account.view==='login' ? 
          <Wrapper>
            <TextField variant="standard" onChange={(e)=> onvalueChange(e)} name='username'label="Enter Username " />

           { error && <Error>Please enter valid username or password</Error>}  
            
            <TextField variant="standard" onChange={(e)=> onvalueChange(e)} name='password' label="Enter Password" />
            <TextChange>
              By continuing, you agree to Flipkart's Terms of Use and Privacy
              Policy.
            </TextChange>
            <LoginButton onClick={()=>loginUser()}>Login</LoginButton>
            <Or style={{textAlign:'center'}}>OR</Or>
            <RequestOTP>Request OTP</RequestOTP>
            <CreateAccount onClick={()=>toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
          </Wrapper>
           :
          <CreateWrapper >
            <TextField variant="standard" onChange={(e)=> oninputChange(e)} name='firstname' label="Enter Firstname" />
            <TextField variant="standard" onChange={(e)=> oninputChange(e)} name='lastname'  label="Enter Lastname" />
            <TextField variant="standard" onChange={(e)=> oninputChange(e)} name='username'  label="Enter Username" />
            <TextField variant="standard" onChange={(e)=> oninputChange(e)} name='email'     label="Enter Email" />
            <TextField variant="standard" onChange={(e)=> oninputChange(e)} name='password'  label="Enter Password" />
            <TextField variant="standard" onChange={(e)=> oninputChange(e)} name='phone'     label="Enter Phone" />
            <LoginButton onClick={()=>signupUser()}>Continue</LoginButton>
          </CreateWrapper>
        }
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
