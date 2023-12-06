const moduleLessonService = require("../services/moduleLessonService");
const sendSuccessResponse = require("../utility/sendSuccessResponse");

<<<<<<< HEAD
// create a new lesson (private)
exports.adminCreateLesson = async (req, res) => {
  try {
    const adminEmail = req.headers.email;
    const data = await userModel.findOne({ email: adminEmail });
    if (data.role === "user") {
      return res
        .status(403)
        .json({ status: false, message: "Forbidden Access" });
    }
    const { courseID, lessonTitle, resource } = req.body;
    const videoFileUrls = req.files.map((file) => ({
      videoTitle: file.originalname, // You can adjust this based on your needs
      videoURL: file.path,
    }));
=======
// create a new lesson(private)
exports.adminCreateLesson = async (req, res, next) => {
  try {
    const adminEmail = req.headers.email;
    const reqBody = req.body;

    const result = await moduleLessonService.adminCreateLesson(req, res, adminEmail, reqBody);
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b

    sendSuccessResponse(res, {
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get all lesson
exports.getAllLesson = async (req, res, next) => {
  try {
    const enrollEmail = req.headers.email;

    if (!enrollEmail) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden Access" });
    }

    const result = await moduleLessonService.getAllLesson();

    sendSuccessResponse(res, {
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
