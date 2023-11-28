const instructorModel = require("../model/instructorModel");
const userModel = require("../model/userModel");
const cloudinary = require("../utility/cloudinaryConfig");

// Create Instructor(private)
exports.addNewInstructor = async (req, res) => {
  try {
    const adminEmail = req.headers.email;
    const data = await userModel.findOne({ email: adminEmail });
    if (data.role === "user") {
      return res.status(403).json({ status: false, message: "Forbidden Access" });
    }

    const { name, email, description, phoneNumber } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "edujar/instructors",
    });
    const course = await new instructorModel({
      name,
      email,
      description,
      image: {
        publicID: imageUpload.public_id,
        url: imageUpload.secure_url,
      },
      phoneNumber,
    });
    await course.save();
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Instructors(public)
exports.getAllInstructor = async (req, res) => {
  try {
    const data = await instructorModel.find();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
