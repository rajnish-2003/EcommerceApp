import User from "../model/user-schema.js";


export const userSignup=async(request,response)=>{

    try{

        const exist=await User.findOne({username:request.body.username});

        if(exist)
        {
            response.status(401).json({message:'Username already exist'})
        }

        const user=request.body;
        const newUser=new User(user);
        await newUser.save();
        
        response.status(200).json({message:user});

    }catch(error)
    {
       response.status(500).json({message:error.message});
    }
}



export const userLogin=async(request,response)=>{

    try{

        const username=request.body.username;
        const password=request.body.password;

       let user= await User.findOne({username:username, password:password})
       if(user)
       {
        response.status(200).json({data:user})
       }
        else
        response.status(401).json(`Invalid Login`);

    }catch(error)
    {
       response.status(500).json({message:error.message});
    }
}


export const AddProducttoUser=async(req,res)=>{

    const { username, productId } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send('User not found');
        }
            
            if (!user.purchasedProducts.includes(productId)) {
                user.purchasedProducts.push(productId);
                
                await user.save();
            }

        res.status(200).send('Product added to purchased list');
    } catch (error) {
        res.status(500).send('Error updating user');
    }

}




export const getUser=async(req,res)=>{

    const { username } = req.params;

    try {
        const order = await User.findOne({ username: username });
        if (!order) {
            return res.status(404).send('User not found');
        }
           
       
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }

}