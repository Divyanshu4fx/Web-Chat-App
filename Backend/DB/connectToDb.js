const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectToMongoDB = async()=>
{
    try {
        // console.log(process.env.MONGO_DB_URI);
       await mongoose.connect(process.env.MONGO_DB_URI);
       console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to database.",error.message);
    }
}

module.exports=connectToMongoDB;