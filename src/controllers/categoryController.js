const categoryModel = require("../model/categoryModel");

// all category
exports.getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// top categories(public)
exports.topCategories = async (req, res) => {
  try {
    const topCategories = await categoryModel.find({}).limit(4);

    res.status(200).json({
      success: true,
      data: topCategories,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
