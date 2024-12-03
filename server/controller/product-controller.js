import Product from "../model/product_schema.js"




export const getProducts=async(request,response)=>{
  
    try{
        const products=await Product.find({});
        return response.status(200).json(products);

    }catch(error)
    {
          response.status(500).json({message:error.message})
    }
}

export const getProductByid=async(request,response)=>{

    try{
            const id=request.params.id;
            const product=await Product.findOne({'id':id});
            return response.status(200).json(product);

    }catch(error)
    {
          return response.status(500).json({message:error.message})
    }
}