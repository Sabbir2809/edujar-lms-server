
// tahmid

const blogModels = require("../models/BlogModel");
const UserModel = require("../models/userModel");

// Create Blog

exports.CreateBlog = async (req, res) => {
    try {

        const adminEmail = req.headers.email;

        const data = await UserModel.findOne({ email: adminEmail });
        if (data.role === "user") {
            return res.status(403).json({ status: false, message: "Forbidden Access" });
        }


        const { title, content, author, image } = req.body // take only required data for req.body

        let newBlog = new blogModels({
            title,
            content,
            author,
            image
        })

        let result = await newBlog.save();

        res.status(200).json({ status: "Success", data: result })
    }


    catch (error) {
        res.status(200).json({ status: "Fail", data: error })

    }
}


// Update Blog
exports.UpdateBlog = async (req, res) => {
    try {

        const adminEmail = req.headers.email;
        const blogId = req.params.id;
        //const reqBody = req.body;

        const data = await UserModel.findOne({ email: adminEmail });
        if (data.role === "user") {
            return res.status(403).json({ status: false, message: "Forbidden Access" });
        }

        let result = await blogModels.findByIdAndUpdate(blogId, req.body, {
            new: true,
        });
        ;

        res.status(200).json({ status: "Success", data: result })
    }


    catch (error) {
        res.status(200).json({ status: "Fail", data: error })

    }
}

//show Blog by ID

exports.ShowBlogById = async (req, res) => {

    try {


        let result = await blogModels.findById(req.params.id)
        res.status(200).json({ status: "Success", data: result })
    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

}





// get All Blogs

exports.getAllBlogs = async (req, res) => {

    try {
        const result = await blogModels.find();
        res.status(200).json({ status: "Success", data: result })

    }

    catch (error) {
        res.status(200).json({ status: "Fail", data: error })
    }

};



