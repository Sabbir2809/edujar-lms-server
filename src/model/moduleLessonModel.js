const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    videoTitle: { type: String, trim: true, required: true },
    videoURL:{type:String,required:true}
})
// Schema
const dataSchema = mongoose.Schema(
  {
    courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
    lessonTitle: { type: String, trim: true, required: true },
    videos: [videoSchema],
    resource: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const moduleLessonModel = mongoose.model("modules", dataSchema);
module.exports = moduleLessonModel;
