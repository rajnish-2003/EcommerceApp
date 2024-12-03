// updateSchema.js
import mongoose from 'mongoose';
import User from "./model/user-schema.js";


 const updateSchema = async () => {

    const URL =
    `mongodb+srv://merajnish1999:zDdufnaaPPTReTST@ecommerce.kp2zx9k.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce`;

    try {
         await mongoose.connect(URL);

        // Find all users and update them to include `purchasedProducts` field
        await User.updateMany({}, { $set: { purchasedProducts: [] } });

        console.log('Updated all users to include `purchasedProducts` field.');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating schema:', error);
        mongoose.disconnect();
    }
};

 updateSchema();
