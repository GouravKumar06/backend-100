const User = require("../models/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req,res) => {
    try{
        const { username, email, password } = req.body;

        const existUser = await User.findOne(
            { $or: [ { username: username }, {email: email}] }
        );

        if(existUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            username, 
            email, 
            password : hashedPassword   
        });
      
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}


exports.loginUser = async(req,res) => {
    try{
        const { email, password } = req.body;
        
        const existUser = await User.findOne({email});

        if(existUser.length === 0){
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }

        const passwordMatch = await bcrypt.compare(
          password,
          existUser.password
        );

        if(!passwordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
          expiresIn: 1000 * 60 * 60 * 24,
        });

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
        })
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Server error"});
   }
}



exports.adminOnly = async (req, res) => {
    try{
        const user = await User.findById(req.user.id);

        if(user.role !== "admin"){
            return res.status(401).json({message: "Unauthorized access"});
        }

        return res.status(200).json({message: "Admin access granted",
            user
        });      

    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}


exports.changePassword = async(req,res) =>{
    try{
        if(!req.user){
            return res.status(401).json({message: "Unauthorized access"});
        }

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }


        const { oldPassword, newPassword } = req.body;

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!passwordMatch){
            return res.status(400).json({message: "Invalid old password"});
        }

        if(oldPassword === newPassword){
            return res.status(400).json({message: "New password cannot be same as old password"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateUser = await User.findByIdAndUpdate(
          req.user.id,
          {
            $set: {
              password: hashedPassword,
              passwordChangedAt: Date.now(),
            },
          },
          { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
            data: updateUser,
        });

    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Server error"});
    }
}


exports.deleteUser = async(req,res) => {
    try{
        

    }catch(error){
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}