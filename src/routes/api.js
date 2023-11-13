// Dependencies
const express = require("express");
const categoryControllers = require("../controllers/categoryController")
const courseController = require("../controllers/categoryController")

const router = express.Router();

// categoryControolers=require

// API Routing End Point:
// Route Task: Tahmid

//Category Controller


router.get("/all-categories", categoryControllers.allCategories)
router.post("/create-course", upload.single("thumbnail"), courseController.createCourse);
router.get("/allCourses", courseController.getAllCourse)
// router.post("/update-course/:id",courseController.UpdateCourse)



// Exports
module.exports = router;
