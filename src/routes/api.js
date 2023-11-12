// Dependencies
const express = require("express");
const categoryControllers = require("../controllers/categoryController")
const router = express.Router();

// categoryControolers=require

// API Routing End Point:
// Route Task: Tahmid

//Category Controller


router.get("/all-categories", categoryControllers.allCategories)



// Exports
module.exports = router;
