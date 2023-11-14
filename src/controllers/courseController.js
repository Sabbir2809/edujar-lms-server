const cloudinary = require("../utility/cloudinaryConfig");
const CourseModel = require("../model/courseModel");
const courseModel = require("../model/courseModel");

// create a new course(private)
exports.adminCreateNewCourse = async (req, res) => {
  try {
    const {title, description, instructorID, categoryID, lessonID, courseAchievement} = req.body;
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
      categoryID,
      lessonID,
      courseAchievement,
    });
    await course.save();

    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
};

// Updated Course (Private)
exports.adminUpdateExistingCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatePost = await CourseModel.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    res.status(200).json({ status: true, data: updatePost });
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
};

// get all courses(public)
exports.getAllCourse = async (req, res) => {
  try {
    let categoriesJoin = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let instructorJoin = {
      $lookup: {
        from: "instructors",
        localField: "instructorID",
        foreignField: "_id",
        as: "instructor",
      },
    };
    let Join = {
      $lookup: {
        from: "instructors",
        localField: "instructorID",
        foreignField: "_id",
        as: "instructor",
      },
    };
    let unwindCategory = { $unwind: "$category" };
    let unwindInstructors = { $unwind: "$instructor" };
    let projection = {
      $project: { "thumbnail.publicID": 0, "thumbnail._id": 0 },
    };
    let course = await CourseModel.aggregate([
      categoriesJoin,
      instructorJoin,
      unwindCategory,
      unwindInstructors,
      projection,
    ]);
    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
};

// featured course(public)
exports.featuredCourse = async (req, res) => {
  try {
    const featuresCourse = await courseModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json({ status: true, data: featuresCourse });
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
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
