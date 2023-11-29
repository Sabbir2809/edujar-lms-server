const cloudinary = require("../utility/cloudinaryConfig");
const courseModel = require("../model/courseModel");
const mongoose = require("mongoose");
const userModel = require("../model/userModel");

// (admin) create a new course
exports.adminCreateNewCourse = async (req, res) => {
  try {
    const adminEmail = req.headers.email;
    const data = await userModel.findOne({ email: adminEmail });
    if (data.role === "user") {
      return res
        .status(403)
        .json({ status: false, message: "Forbidden Access" });
    }

<<<<<<< HEAD
    const {
      title,
      description,
      instructorID,
      categoryID,
      lessonID,
      courseAchievement,
    } = req.body;
=======
    const { title, price, description, instructorID, categoryID, lessonID, courseAchievement } = req.body;
>>>>>>> dbcd7aecd7657e1ce7cd3e6bed443c856e26f079

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "edujar/thumbnail",
    });

    const course = await new courseModel({
      title,
      price,
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

    res.status(200).json({
      status: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// (admin) Update Course
exports.adminUpdateExistingCourse = async (req, res) => {
  try {
    const adminEmail = req.headers.email;
    const data = await userModel.findOne({ email: adminEmail });
    if (data.role === "user") {
      return res
        .status(403)
        .json({ status: false, message: "Forbidden Access" });
    }

    const courseId = req.params.id;
    const updatePost = await courseModel.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      data: updatePost,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all courses(public)
exports.getAllCourse = async (req, res) => {
  try {
    const categoriesJoin = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const instructorJoin = {
      $lookup: {
        from: "instructors",
        localField: "instructorID",
        foreignField: "_id",
        as: "instructor",
      },
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
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// single courseDetails (public)
exports.courseDetails = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    const match = { $match: { _id: courseId } };
    const categoriesJoin = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const instructorJoin = {
      $lookup: {
        from: "instructors",
        localField: "instructorID",
        foreignField: "_id",
        as: "instructor",
      },
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
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// popular course (public)
exports.popularCourse = async (req, res) => {
  try {
<<<<<<< HEAD
    const featuresCourse = await courseModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json({ status: true, data: featuresCourse });
=======
    const featuresCourse = await courseModel.find({}).sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ success: true, data: featuresCourse });
>>>>>>> dbcd7aecd7657e1ce7cd3e6bed443c856e26f079
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
<<<<<<< HEAD
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
=======

// TODO: courseByCategory

// TODO:
>>>>>>> dbcd7aecd7657e1ce7cd3e6bed443c856e26f079
