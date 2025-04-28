const User = require('../models/user.schema')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAuthenticated = async (req,res,next) =>{
    try{

      const token =
        req.cookies.token ||
        req.headers.authorization.split(" ")[1] ||
        req.headers.cookie.split(";")[1].split("=")[1];

      if (!token) {
        return res.status(401).json({
          message: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return res.status(500).json({
          message: "user no longer exists",
        });
      }

      // Important security check 🔥
      if (currentUser.passwordChangedAt) {
        const changedTimestamp = parseInt(
          currentUser.passwordChangedAt.getTime() / 1000,
          10
        );

        if (decoded.iat < changedTimestamp) {
          return res.status(401).json({
            message: "Password changed recently. Please login again.",
          });
        }
      }

      req.user = decoded;
      next();
    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({
            message: "Internal server error during authentication",
        });
    }
}

module.exports = {isAuthenticated}