const cloudinary = require("../utility/cloudinaryConfig");
const courseModel = require("../model/courseModel");
const mongoose = require("mongoose");

// create a new course(private)
exports.adminCreateNewCourse = async (req, res) => {
  try {
    const { title, description, instructorID, categoryID, lessonID, courseAchievement } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "edujar/thumbnail",
    });

    const course = await new courseModel({
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
    res.status(500).json({ status: false, error: error.message });
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
    res.status(500).json({ status: false, error: error.message });
  }
};

// get all courses(public)
exports.getAllCourse = async (req, res) => {
  try {
    const categoriesJoin = {
      $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" },
    };
    const instructorJoin = {
      $lookup: { from: "instructors", localField: "instructorID", foreignField: "_id", as: "instructor" },
    };
    const unwindCategory = { $unwind: "$category" };
    const unwindInstructors = { $unwind: "$instructor" };
    const projection = {
      $project: { "thumbnail.publicID": 0, "thumbnail._id": 0 },
    };

    const course = await courseModel.aggregate([
      categoriesJoin,
      instructorJoin,
      unwindCategory,
      unwindInstructors,
      projection,
    ]);
    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// single courseDetails(public)
exports.courseDetails = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    const match = { $match: { _id: courseId } };
    const categoriesJoin = {
      $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" },
    };
    const instructorJoin = {
      $lookup: { from: "instructors", localField: "instructorID", foreignField: "_id", as: "instructor" },
    };
    const unwindCategory = { $unwind: "$category" };
    const unwindInstructors = { $unwind: "$instructor" };
    const projection = {
      $project: { "thumbnail.publicID": 0, "thumbnail._id": 0 },
    };

    const course = await courseModel.aggregate([
      match,
      categoriesJoin,
      instructorJoin,
      unwindCategory,
      unwindInstructors,
      projection,
    ]);
    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// featured course(public)
exports.featuredCourse = async (req, res) => {
  try {
    const featuresCourse = await courseModel.find({}).sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ status: true, data: featuresCourse });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
