const mongoose = require("mongoose");

const roleType = {
  user: "user",
  admin: "admin",
};

// Schema
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    photo: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, enum: Object.values(roleType), default: roleType.user },
  },
  { timestamps: true, versionKey: false }
);

// model
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
