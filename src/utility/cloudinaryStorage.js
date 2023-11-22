const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../utility/cloudinaryConfig");
<<<<<<< HEAD
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "edujar/lesson_videos", // Set the folder name where the video will be stored
        resource_type: "video", // Specify the resource type
        allowed_formats: ["mp4", "webm"], // Specify allowed video formats
        use_filename: true, // Use the original file name as the Cloudinary public ID
    },
});
let videoUpload = multer({ storage: storage, limits: "100mb" });
module.exports = videoUpload;
=======

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lesson_videos", // Set the folder name where the video will be stored
    resource_type: "video", // Specify the resource type
    allowed_formats: ["mp4", "webm"], // Specify allowed video formats
    use_filename: true, // Use the original file name as the Cloudinary public ID
  },
});
let videoUpload = multer({ storage: storage, limits: "100mb" });
module.exports = videoUpload;
>>>>>>> b09ad2a8e13e0533035439305b00d9c43d632884
