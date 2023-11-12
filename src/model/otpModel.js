const mongoose = require("mongoose");

// Schema
const OTPSchema = new mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

// model
const OTPModel = mongoose.model("otps", OTPSchema);
module.exports = OTPModel;