const mongoose = require("mongoose");

// Schema
const dataSchema = mongoose.Schema(
  {
<<<<<<< HEAD
      courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, trim: true, required: true, unique: true },
    videoTitle: { type: String, trim: true, required: true },
      videoURL: [
    {
        type: String,
        required: true,
    },
],
=======
    courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, trim: true, required: true, unique: true },
    videoTitle: { type: String, trim: true, required: true },
    videoURL: [
      {
        type: String,
        required: true,
      },
    ],
>>>>>>> b09ad2a8e13e0533035439305b00d9c43d632884
    resource: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const moduleLessonModel = mongoose.model("modules", dataSchema);
module.exports = moduleLessonModel;
