import { products } from "./constants/data.js";
import Product from "./model/product_schema.js";

const Defaultdata = async () => {
  try {
    //await Product.deleteMany({}); we cant delete all the data and insert again very lenthy process and time gaining
    await Product.insertMany(products);
    console.log("Data imported Succesfully");
  } catch (error) {
    console.log("Error while inserting default database", error.message);
  }
};

export default Defaultdata;
