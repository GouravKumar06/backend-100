const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.Database_URL);
        console.log('MongoDB connected...');

    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }

}

module.exports = connectDB;