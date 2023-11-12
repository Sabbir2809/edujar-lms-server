const mongoose = require("mongoose");

const roleType = {
  user: "user",
  admin: "admin",
};

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    photo: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, enum: Object.values(roleType), default: roleType.user },
  },
  { timestamps: true, versionKey: false }
);

// model
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
