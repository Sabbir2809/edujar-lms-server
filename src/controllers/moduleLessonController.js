const moduleLessonModel = require("../model/moduleLessonModel");
const userModel = require("../model/userModel");

// create a new lesson(private)
exports.adminCreateLesson = async (req, res) => {
  try {
    const adminEmail = req.headers.email;
    const data = await userModel.findOne({ email: adminEmail });
    if (data.role === "user") {
      return res.status(403).json({ status: false, message: "Forbidden Access" });
    }

    const { courseID, lessonTitle, resource } = req.body;
    const videoFileUrls = req.files.map((file) => ({
      videoTitle: file.originalname, // You can adjust this based on your needs
      videoURL: file.path,
    }));

    const lesson = await moduleLessonModel.create({
      courseID,
      lessonTitle,
      resource,
      videos: videoFileUrls,
    });

    res.status(200).json({ status: true, data: lesson });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// get all lesson
exports.getAllLesson = async (req, res) => {
  try {
    const enrollEmail = req.headers.email;
    if (!enrollEmail) {
      return res.status(403).json({ success: false, message: "Forbidden Access" });
    }
    const lesson = await moduleLessonModel.find();
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
