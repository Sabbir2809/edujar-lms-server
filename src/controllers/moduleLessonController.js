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