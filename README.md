# Edujar LMS Server

Build an online learning platform with user registration, course creation, video streaming, and progress tracking.

## Student Features:

1. Get All Category
1. Top Category
1. Get All Course
1. Featured Course
1. Get All Instructor

## Admin Features:

1. Create a New Course
1. Update the Course
1. Add New Instructor

### routes Folder api.js file:

```js
// Dependencies
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const courseController = require("../controllers/courseController");
const instructorController = require("../controllers/instructorController");
const upload = require("../utility/multerConfig");

// Public API Routing Endpoint
router.get("/all-category", categoryController.getAllCategory);
router.get("/top-categories", categoryController.topCategories);
router.get("/all-course", courseController.getAllCourse);
router.get("/featured-course", courseController.featuredCourse);
router.get("/all-instructor", instructorController.getAllInstructor);

// Private API Routing Endpoint
router.post("/create-new-course", upload.single("thumbnail"), courseController.adminCreateNewCourse);
router.post("/update-existing-course", courseController.adminUpdateExistingCourse);
router.post("/add-instructor", upload.single("image"), instructorController.addNewInstructor);

// Exports
module.exports = router;
```

Main Package: `npm install express cors mongoose dotenv jsonwebtoken bcrypt express-rate-limit helmet npp  express-mongo-sanitize nodemailer nodemon multer cloudinary`
