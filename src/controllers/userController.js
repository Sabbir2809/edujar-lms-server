<<<<<<< HEAD


var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userModels = require("../model/userModel")

exports.Registration = async (req, res) => {


    let reqBody = (req.body)

    try {
        let result = await userModels.create(reqBody)
        res.status(200).json({ status: "true", data: result })
    }
    catch (error) {
        res.status(200).json({ status: "Fail", data: error })

    }


}




// Login (In Login create Token)

exports.Login = async (req, res) => {
    try {
        let reqBody = req.body
        let result = await userModels.find(reqBody).count("total"); // Counting 1 means --> user ase

        if (result === 1) {
            // Create JSON Web Token or Token Issue

            let payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: req.body["email"]
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

            res.status(200).json({ status: "true", data: token })
        }

        else {
            res.status(200).json({ status: "Fail", data: error })

        }

    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }
}


// READ PROFILE

exports.ProfileDetails = async (req, res) => {
    try {
        let email = req.headers['email'];
        let result = await userModels.find({ email: email });
        res.status(200).json({ status: "true", data: result })
    }

    catch (error) {

        res.status(200).json({ status: "Fail", data: error })

    }

}



=======
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
>>>>>>> c0262d8305abaeaedbee2e2924524c8fdf063bbb
