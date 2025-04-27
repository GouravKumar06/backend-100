const Image = require('../models/image.schema')
const uploadToCloudinary = require('../helpers/cloudinaryHelpers')
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

        const images = await Image.find({});

        return res.status(200).json({
            success: true,
            message: "Images fetched successfully",
            images
        })

    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during fetching images",
        })
    }
}