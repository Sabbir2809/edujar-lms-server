const mongoose = require("mongoose");

// Schema
const dataSchema = mongoose.Schema(
  {
      courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, trim: true, required: true, unique: true },
    videoTitle: { type: String, trim: true, required: true },
      videoURL: [
    {
        type: String,
        required: true,
    },
],
    resource: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const moduleLessonModel = mongoose.model("modules", dataSchema);
module.exports = moduleLessonModel;
