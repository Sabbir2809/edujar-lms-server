const mongoose = require("mongoose");

// Schema
const dataSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true, required: true },
    thumbnail: [
      {
        publicID: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    instructorID: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
    lessonID: { type: mongoose.Schema.Types.ObjectId, required: true },
    courseAchievement: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const courseModel = mongoose.model("courses", dataSchema);
module.exports = courseModel;
