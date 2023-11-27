const mongoose = require("mongoose");

// Schema
const dataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
const instructorModel = mongoose.model("instructors", dataSchema);
module.exports = instructorModel;
