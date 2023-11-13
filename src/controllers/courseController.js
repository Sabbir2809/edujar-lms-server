// course task: Rasel
const cloudinary = require("../utility/cloudinaryConfig");
const CourseModel = require("../model/courseModel");

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructorID, categoriesID, lessonID,courseAchiv } =
      req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    let imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "edujar/thumbnail",
    });

    let data = await new CourseModel({
      title,
      description,
      thumbnail:{
      publicID: imageUpload.public_id, url: imageUpload.secure_url},
      instructorID,
      categoriesID,
      lessonID,
      courseAchiv
    });
    await data.save();
    res.status(200).json({ status: true, data:data });
  } catch (error) {
    res.status(200).json({ status: false, data: error });
  }
};

//get all courses
exports.getAllCourse = async (req,res)=>{
  try{
    let projection ={$project:{'thumbnail.publicID':0,'thumbnail._id':0}}
    let data = await CourseModel.aggregate([
      projection
    ])
    res.status(200).json({ status: true, data:data });
  }catch (error) {
    res.status(200).json({ status: false, data: error });
  }
}


