import axios from 'axios';

const URL = 'http://localhost:8000';

export const authenticateSignup = async (data) => {
    try {
        const response = await axios.post(`${URL}/signup`, data);
        return response;
    } catch (error) {
        if (error.response) {
            
            console.error('Error Response:', error.response.data);
            console.error('Status Code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            
            console.error('Error Request:', error.request);
        } else {
            
            console.error('Error Message:', error.message);
        }
        console.error('Error Config:', error.config);
    }
};




export const authenticateLogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/login`, data);  //401 status can't go to try block 
        return response; 
    } catch (error) {
        if (error.response) {
            
            console.error('Error Response:', error.response.data);
            console.error('Status Code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            
            console.error('Error Request:', error.request);
        } else {
            
            console.error('Error Message:', error.message);
        }
        console.error('Error Config:', error.config);

        return error.response;
    }
};



 /*export const payUsingPaytm=async(data)=>{

    try{

      let response=await axios.post(`${URL}/payment`, data);
     
      return response.data;

    }catch(error)
    {
        console.log("Error while calling payment api",error);
    }
}*/
