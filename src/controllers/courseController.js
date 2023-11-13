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
    let projection = {
      $project: { "thumbnail.publicID": 0, "thumbnail._id": 0 },
    };
    let course = await CourseModel.aggregate([projection]);
    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(200).json({ status: false, data: error });
  }
};
