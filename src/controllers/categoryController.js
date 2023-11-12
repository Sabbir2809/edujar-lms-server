// Category task: Ebad

const categoryModel = require("../model/categoryModel");

const AllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
