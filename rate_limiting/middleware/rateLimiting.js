const rateLimiting = require("express-rate-limit");

const createBasicRateLimiter = (maxRequests,time) =>{
    return rateLimiting({
        windowMs: time,
        max: maxRequests,
        message : "Too many requests, please try again later",
        standardHeaders : true,
        legacyHeaders : false
    })
}
    
module.exports = createBasicRateLimiter;