const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isAuthenticated = async (req,res,next) =>{
    try{

        const token =
          req.cookies.token ||
          req.headers.authorization.split(" ")[1] ||
          req.headers.cookie.split(";")[1].split("=")[1];

        if(!token){
            return res.status(401).json({
                message: "Unauthorized access",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

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