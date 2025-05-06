
const requestLogger = (req,res,next) => {
    const timeStamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.get('user-agent');
    console.log(`At Time [${timeStamp}] : my method is [${method}] and url is [${url}] and user agent is [${userAgent}]`);
    next();
}

const addTimeStamp = (req,res,next) => {
    req.timeStamp = new Date().toISOString();
    next();
}


module.exports = { requestLogger,addTimeStamp };