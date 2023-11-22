<<<<<<< HEAD
// create a new lesson(private)
const moduleLessonModel = require("../model/moduleLessonModel");
exports.adminCreateLesson = async (req, res) => {
    try {
        const {courseID,title, videoTitle, resource} = req.body;
        const videoFileUrl = req.files.map((file) => file.path); //for upload multiple video
        let lesson = await new moduleLessonModel({
            courseID,
            title,
            videoTitle,
            resource,
            videoURL:videoFileUrl
        });
        await lesson.save();
        res.status(200).json({ status: true, data: lesson });
    } catch (error) {
        res.status(200).json({ status: false, error: error.message });
    }
};
exports.getAllLesson = async (req, res) => {
    try {
        let lesson = await moduleLessonModel.find();
        res.status(200).json({ status: true, data: lesson });
    } catch (error) {
        res.status(200).json({ status: false, error: error.message });
    }
};
//api.js
// const videoUpload = require("../utility/cloudinaryStorage")
// const lessonController = require("../controllers/moduleLessonController")
// router.post("/create-lesson",videoUpload.array("videoURL"),lessonController.adminCreateLesson)
// router.get("/all-lesson",lessonController.getAllLesson) //private
=======
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

    const { courseID, title, videoTitle, resource } = req.body;
    const videoFileUrl = req.files.map((file) => file.path); //for upload multiple video

    const lesson = await new moduleLessonModel({
      courseID,
      title,
      videoTitle,
      resource,
      videoURL: videoFileUrl,
    });
    await lesson.save();
    res.status(200).json({ status: true, data: lesson });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// get all lesson
exports.getAllLesson = async (req, res) => {
  try {
    const lesson = await moduleLessonModel.find();
    res.status(200).json({ status: true, data: lesson });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
>>>>>>> b09ad2a8e13e0533035439305b00d9c43d632884
