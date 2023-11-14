# Edujar LMS Server

Build an online learning platform with user registration, course creation, video streaming, and progress tracking.

## Student Features:

1. Registration
1. Login
1. Profile Details
1. Get All Category
1. Top Category
1. Get All Course
1. Get Single Course
1. Featured Course
1. Get All Instructor

## Admin Features:

1. Create a New Course
1. Update the Course
1. Add New Instructor
1. Enroll Course

### routes Folder api.js file:

```js
// Dependencies
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const courseController = require("../controllers/courseController");
const instructorController = require("../controllers/instructorController");
const upload = require("../utility/multerConfig");
const userController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const enrollmentController = require("../controllers/enrollmentController");

// Public API Routing Endpoint
router.get("/all-category", categoryController.getAllCategory);
router.get("/top-categories", categoryController.topCategories);
router.get("/all-course", courseController.getAllCourse);
router.get("/course-details/:id", courseController.courseDetails);
router.get("/featured-course", courseController.featuredCourse);
router.get("/all-instructor", instructorController.getAllInstructor);

// User
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/profile-details", UserVerifyMiddleware, userController.profileDetails);

// Private API Routing Endpoint
router.post("/create-new-course", upload.single("thumbnail"), courseController.adminCreateNewCourse);
router.post("/update-existing-course", courseController.adminUpdateExistingCourse);
router.post("/add-instructor", upload.single("image"), instructorController.addNewInstructor);
router.get("/enroll-course", UserVerifyMiddleware, enrollmentController.courseEnroll);
router.get("/enroll-course-info", enrollmentController.enrollCourseInfo);

// Exports
module.exports = router;
```

Main Package: `npm install express cors mongoose dotenv jsonwebtoken bcrypt express-rate-limit helmet npp  express-mongo-sanitize nodemailer nodemon multer cloudinary`
