const Image = require('../models/image.schema')
const uploadToCloudinary = require('../helpers/cloudinaryHelpers')
const cloudinary = require('../config/cloudinary')
const User = require('../models/user.schema');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
    try{

        const user = await User.findById(req.user.id);
        
        if(user.role !== "admin"){
            return res.status(401).json({message: "Unauthorized access"});
        }


        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            })
        }

        const {url, publicId} = await uploadToCloudinary(req.file.path);

        const image = await Image.create({
            url,
            publicId,
            uploadedBY: req.user.id
        })

        //delete the file from local machine after uploading to cloudinary
        fs.unlinkSync(req.file.path);

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            image
        })

    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during uploading images",
        })
    }
}


exports.fetchImages = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1 ) * limit;

        const sortBy = req.query.sortBy || 'createdAt'
        const sortOrder = req.query.sortOrder === 'asc'? 1 : - 1 ;
        
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);

        const sortobj = {}
        sortobj[sortBy] = sortOrder

        const images = await Image.find().sort(sortobj).skip(skip).limit(limit);

        if(images){
            return res.status(200).json({
              success: true,
              message: "Images fetched successfully",
              currentPage:page,
              totalPages: totalPages,
              totalImages:totalImages,
              data:images,
            });
        }

    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during fetching images",
        })
    }
}



exports.deleteImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const images = await Image.find({ uploadedBY: req.user.id });


    const image = await Image.findById(req.params.id)


    if(!image){
        return res.status(401).json({ message: "image not found" });
    }

    const imageAccess = images.find(
      (img) => img._id.toString() === image._id.toString()
    );

    if(!imageAccess){
        return res.status(401).json({ message: "you does not have access to delete this image" });   
    }

    await cloudinary.uploader.destroy(image.publicId)

    await Image.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      success: true,
      message: "image deleted successfully",
    });


  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};