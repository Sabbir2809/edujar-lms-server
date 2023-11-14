const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const { EncodedToken } = require("../utility/Token");

// Registration
exports.registration = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // password validation
    if (password.length < 4) {
      return res
        .status(400)
        .json({ success: false, message: "The length of User password can be minimum 4 characters" });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User Already Exist" });
    }
    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 8);

    // create user
    await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // response
    res.status(201).json({
      status: true,
      message: "User Registration Successful",
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email is not registered" });
    }
    // password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // generate token
    const token = EncodedToken(req.body);

    // response
    res.status(200).json({
      status: true,
      message: "User Login Successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// User Profile Get
exports.profileDetails = async (req, res) => {
  try {
    const email = req.headers.email;

    const data = await userModel.aggregate([{ $match: { email } }]);

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
