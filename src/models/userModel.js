const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [],
  },
  { timestamps: true, versionKey: false }
);

// model
const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
