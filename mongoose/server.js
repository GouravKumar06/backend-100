const express = require('express');
const User = require("./model/user.schema")

const connectDB = require('./config/db')
const app = express();



const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function createUser(){
    try{
        // const user = new User({
        //     name: 'john Doe',
        //     email: 'john@example.com',
        //     password: 'jnfg345',
        //     age: 40,
        //     isActive: true,
        //     phone: '123-456-7890',
        //     address: '123 Main St',
        //     city: 'New York',
        //     state: 'NY',
        //     country: 'USA',
        //     zip: '125102',
        //     DOB : new Date(),
        //     gender: 'male',
        //     role: 'admin'
        // });

        // const result = await user.save();


            // find with the help of projection
        // const userExist = await User.find({
        //     $and:[
        //         { role:"admin"},
        //         {age:{$gt:40}},
        //     ]},{name:1,email:1,_id:0}
        // );

            // find with the help of select method
        const userExist = await User.find(
        {
            $and: [{ role: "admin" }, { age: { $gt: 30 } }],
        },
        ).select('name email -_id'); // Exclude _id field

        if(userExist.length === 0){
            console.log("User not exists");
            return;
        }
        console.log("userExist: ",userExist);


        // console.log("User created successfully");


    }catch(err){
        console.error(`Error: ${err.message}`);
    }
}

// createUser();

async function count(){
    try{
        const count = await User.countDocuments({ age: { $gt: 30 } });
        console.log("Count of users with age greater than 30:", count);
    }catch(err){
        console.error(`Error: ${err.message}`);
    }
}

count();

// Connect to MongoDB
connectDB();

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});