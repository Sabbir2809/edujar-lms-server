

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



