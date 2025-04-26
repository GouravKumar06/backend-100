const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age:Number,
    isActive:Boolean,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    DOB : Date,
    gender: String,
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{timestamps:true});


module.exports = mongoose.model('User', userSchema);