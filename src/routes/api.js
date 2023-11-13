// Dependencies
const express = require("express");
const categoryController = require("../controllers/categoryController");
const courseController = require("../controllers/courseController");
const upload = require("../utility/multerConfig");
const router = express.Router();

// Public API Routing Endpoint
router.get("/all-category", categoryController.getAllCategory);
router.get("/all-course", courseController.getAllCourse);

// Private API Routing Endpoint
router.post("create-course", upload.single("thumbnail"), courseController.createCourse);

// Exports
module.exports = router;