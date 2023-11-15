const moduleLessonModel = require("../model/moduleLessonModel");

// create a new lesson(private)
exports.adminCreateLesson = async (req, res) => {
  try {
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
