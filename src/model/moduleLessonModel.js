const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
<<<<<<< HEAD
    videoTitle: { type: String, trim: true, required: true },
    videoURL:{type:String,required:true}
})
=======
  videoTitle: { type: String, trim: true, required: true },
  videoURL: { type: String, required: true },
});

>>>>>>> dbcd7aecd7657e1ce7cd3e6bed443c856e26f079
// Schema
const dataSchema = mongoose.Schema(
  {
    courseID: { type: mongoose.Schema.Types.ObjectId, required: true },
<<<<<<< HEAD
    lessonTitle: { type: String, trim: true, required: true },
=======
    title: { type: String, trim: true, required: true, unique: true },
>>>>>>> dbcd7aecd7657e1ce7cd3e6bed443c856e26f079
    videos: [videoSchema],
    resource: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const moduleLessonModel = mongoose.model("modules", dataSchema);
module.exports = moduleLessonModel;
