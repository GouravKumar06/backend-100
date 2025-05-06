const cors = require("cors");

const configureCors = () => {
    return cors({
        origin : (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:3000",  //local host
                "https://your-frontend-domain.com", // Replace with your production frontend domain
            ]

            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);   // allow the request
            } else {
                callback(new Error("Not allowed by CORS"));    // block the request
            }
        },

        methods: ["GET", "POST", "PUT","PATCH", "DELETE"], // Allow only GET, POST, PUT, and DELETE methods
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Accept-Version",
        ],
        exposedHeaders:[
            "Content-Range",
            "X-Total-Count",          
        ],
        credentials : true,       // allow credentials like cookies
        preflightContinue : false,      // allow preflight requests
        maxAge : 3600,            // preflight request cache time (avoid sending options request multiple times)
        optionsSuccessStatus : 204,     // success status code
    })
}



module.exports = configureCors;