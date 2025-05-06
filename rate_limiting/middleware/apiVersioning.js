
const urlVersioning  = (version) => (req, res, next) => {
    if (req.originalUrl.startsWith(`/api/${version}`)) {
      next();
    } else {
      res.status(404).json({
        success: false,
        error: "API Version is not Supported",
      });
    }   
}


const headerVersioning = (version) => (req, res, next) => {
    if(req.get('Accept-Version') === version){
        next();
    }else{
        req.status(404).json({
            success: false,
            error : "API Version is npt Supported",
        });
    }
}


const contentTypeVersioning = (version) => (req, res, next) => {
    const contentType = req.get("Content-Type");

    if (contentType && contentType.includes(`application/vnd.api.${version}+json`)) {
      next();
    } else {
      req.status(404).json({
        success: false,
        error: "API Version is npt Supported",
      });
    }
}

module.exports = { urlVersioning, headerVersioning, contentTypeVersioning };