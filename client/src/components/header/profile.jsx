import { Box,Typography,MenuItem,Menu,styled } from "@mui/material";
import { useState } from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/dataProvider";
import { useNavigate } from "react-router-dom";

const Component=styled(Menu)`
margin-top:5px;`;

const Logout=styled(Typography)`
margin-left:5px;
font-size:14px;`;


const Profile=({account,setAccount})=>{

const [open,setOpen]=useState(false);

const {user}=useContext(DataContext);
const {SetOrders}=useContext(DataContext);
const navigate=useNavigate();

const handleClick=(event)=>{
    setOpen(event.currentTarget);
}

    const handleClose=()=>{

        setOpen(false);
        
    }

    const logout=()=>{
        setAccount('');
        SetOrders([]);
    }

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/orders/${user}`);
             
            SetOrders(response.data.purchasedProducts)
            navigate('/my-orders');
           

        } catch (error) {
            console.error("Failed to fetch user orders:", error);
        }
    }


    return(
        <>
                <Box onClick={handleClick}><Typography style={{marginTop:2, cursor:"pointer"}}>{account.toLowerCase()}</Typography></Box>

                <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                >

                <MenuItem onClick={() => { handleClose(); fetchOrders(); }}> 
                <CheckBoxIcon color="primary" fontSize="small"/>
                <Logout>My Orders</Logout>
                </MenuItem>

                <MenuItem onClick={()=>{handleClose(); logout()}}>
                <PowerSettingsNewIcon color="primary" fontSize="small"/>
                <Logout>Logout</Logout>
                </MenuItem>

                
            </Component>
        </>
    )
}

export default Profile;