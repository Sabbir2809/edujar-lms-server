// Category task: Ebad

const categoryModel = require("../model/categoryModel");

const allCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    allCategories
}
