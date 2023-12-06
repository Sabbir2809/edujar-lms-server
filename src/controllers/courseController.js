const mongoose = require("mongoose");
<<<<<<< HEAD
const userModel = require("../model/userModel");
const ObjectId = mongoose.Types.ObjectId;
=======
const sendSuccessResponse = require("../utility/sendSuccessResponse");
const courseService = require("../services/courseService");
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b

// (admin) create a new course
exports.adminCreateNewCourse = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
<<<<<<< HEAD
    const data = await userModel.findOne({ email: adminEmail });
    if (data.role === "user") {
      return res
        .status(403)
        .json({ status: false, message: "Forbidden Access" });
    }

    const {
      title,
      price,
      description,
      instructorID,
      categoryID,
      lessonID,
      courseAchievement,
    } = req.body;
=======
    const reqBody = req.body;

    const result = await courseService.adminCreateNewCourse(req, res, adminEmail, reqBody);
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b

    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// (admin) Update Course
exports.adminUpdateExistingCourse = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
<<<<<<< HEAD
    const data = await userModel.findOne({ email: adminEmail });
    if (data.role === "user") {
      return res
        .status(403)
        .json({ status: false, message: "Forbidden Access" });
    }

=======
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b
    const courseId = req.params.id;
    const reqBody = req.body;

    const result = await courseService.adminUpdateExistingCourse(res, adminEmail, courseId, reqBody);

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all courses
exports.getAllCourse = async (req, res, next) => {
  try {
<<<<<<< HEAD
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
=======
    const result = await courseService.getAllCourse();
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// single courseDetails
exports.courseDetails = async (req, res, next) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.id);

<<<<<<< HEAD
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
=======
    const result = await courseService.courseDetails(courseId);
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// popular course
exports.popularCourse = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const featuresCourse = await courseModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json({ success: true, data: featuresCourse });
=======
    const result = await courseService.popularCourse();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b
  } catch (error) {
    next(error);
  }
};

<<<<<<< HEAD
// TODO: courseByCategory
exports.courseByCategory = async (req, res) => {
  try {
    const categoryID = new ObjectId(req.params.id);
    const matchID = { $match: { categoryID: categoryID } };
    const projectionStage = {
      $project: {
        categoryID: 0,
        courseAchievement: 0,
        createdAt: 0,
        instructorID: 0,
        lessonID: 0,
        updatedAt: 0,
      },
    };
    const categoriesJoin = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const data = await courseModel.aggregate([
      matchID,
      categoriesJoin,
      projectionStage,
    ]);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
=======
// courseByCategory
exports.courseByCategory = async (req, res, next) => {
  try {
    const categoryID = new mongoose.Types.ObjectId(req.params.id);
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b

    const result = await courseService.courseByCategory(categoryID);

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
