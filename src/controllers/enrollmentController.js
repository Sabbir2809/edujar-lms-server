const enrollmentModel = require("../model/enrollmentModel");
const courseModel = require("../model/courseModel");
const userModel = require("../model/userModel");

// course enrollment(private)
exports.courseEnroll = async (req, res) => {
  try {
    const { userID, courseID } = req.body;

    // Find the course and user by their IDs
    const course = await courseModel.findById(courseID);
    const user = await userModel.findById(userID);

    if (!course || !user) {
      return res.status(404).json({ message: "Course or user not found" });
    }

    const enrollData = await enrollmentModel.create({ userID, courseID });

    res.status(200).json({
      status: true,
      data: enrollData,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// enrollment user(private)
exports.enrollCourseInfo = async (req, res) => {
  try {
    const userJoin = {
      $lookup: { from: "users", localField: "userID", foreignField: "_id", as: "user" },
    };
    const courseJoin = {
      $lookup: { from: "courses", localField: "courseID", foreignField: "_id", as: "course" },
    };

    const unwindUser = { $unwind: "$user" };
    const unwindCourse = { $unwind: "$course" };
    const projection = {
      $project: { "course.thumbnail.publicID": 0, "course.thumbnail._id": 0, "user.password": 0 },
    };

    const enrollData = await enrollmentModel.aggregate([
      userJoin,
      courseJoin,
      unwindUser,
      unwindCourse,
      projection,
    ]);

    res.status(200).json({
      status: true,
      data: enrollData,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
