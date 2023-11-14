const cloudinary = require("../utility/cloudinaryConfig");
const CourseModel = require("../model/courseModel");

// create a new course(private)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructorID, categoriesID, lessonID, courseAchiv } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    let imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "edujar/thumbnail",
    });

    let course = await new CourseModel({
      title,
      description,
      thumbnail: {
        publicID: imageUpload.public_id,
        url: imageUpload.secure_url,
      },
      instructorID,
      categoriesID,
      lessonID,
      courseAchiv,
    });
    await data.save();
    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(200).json({ status: false, data: error });
  }
};

// get all courses(public)
exports.getAllCourse = async (req, res) => {
  try {
    let categoriesJoin = {$lookup:{from:"categories",localField:"categoriesID",foreignField:"_id",as:"category"}}
    let instructorJoin = {$lookup:{from:"instructors",localField:"instructorID",foreignField:"_id",as:"instructor"}}
    // let Join = {$lookup:{from:"instructors",localField:"instructorID",foreignField:"_id",as:"instructor"}}
    let unwindCategory = {$unwind:"$category"}
    let unwindInstructors = {$unwind:"$instructor"}
    let projection = {
      $project: { "thumbnail.publicID": 0, "thumbnail._id": 0 },
    };
    let course = await CourseModel.aggregate([categoriesJoin,instructorJoin,unwindCategory,unwindInstructors,projection]);
    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(200).json({ status: false, data: error });
  }
};
//update post
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatePost = await CourseModel.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    res.status(200).json({ status: true, data: updatePost });
  } catch (error) {
    res.status(200).json({ status: false, data: error });
  }
};
// router.post("/updateCourse", courseController.updateCourse);