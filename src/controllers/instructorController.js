const instructorModel = require("../model/instructorModel");
const cloudinary = require("../utility/cloudinaryConfig");

// Create Instructor(private)
exports.addNewInstructor = async (req, res) => {
  try {
    const { name, email, description, phoneNumber } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    let imageUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "edujar/instructors",
    });
    let course = await new instructorModel({
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
    res.status(200).json({ status: true, data: course });
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
};

// Get All Instructors(public)
exports.getAllInstructor = async (req, res) => {
  try {
    let data = await instructorModel.find();
    res.status(200).json({ status: true, data: data });
  } catch (error) {
    res.status(200).json({ status: false, error: error.message });
  }
};
