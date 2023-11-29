# Edujar LMS Server

Build an online learning platform with user registration, course creation, video streaming, and progress tracking.

## Student Features:

1. Registration
1. Login
1. User Profile Details and Update
1. Email Verify, OTP Verify and Forget Password
1. Get All Category
1. Top Category
1. Get All Course
1. Get Single Course
1. Popular Course
1. Get All Instructor
1. Get Module Lesson

## Admin Features:

1. Create a New Course
1. Update the Course
1. Add New Instructor
1. Enroll Course
1. Create a New Module Lesson

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
const moduleLessonController = require("../controllers/moduleLessonController");
const videoUpload = require("../utility/cloudinaryStorage");
const AdminVerifyMiddleware = require("../middleware/AdminVerifyMiddleware");

// User Profile API Endpoint:
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/user-profile-details", UserVerifyMiddleware, userController.userProfileDetails);
router.put("/user-profile-update", UserVerifyMiddleware, userController.userProfileUpdate);
router.get("/verify-email/:email", userController.verifyEmail);
router.get("/verify-otp/:email/:otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);

// (Public) API Endpoint:
router.get("/all-category", categoryController.getAllCategory);
router.get("/top-categories", categoryController.topCategories);
router.get("/all-course", courseController.getAllCourse);
router.get("/course-details/:id", courseController.courseDetails);
router.get("/popular-course", courseController.popularCourse);
router.get("/all-instructor", instructorController.getAllInstructor);

// (Private) API Endpoint:
router.get("/enroll-course", UserVerifyMiddleware, enrollmentController.courseEnroll);
router.get("/enroll-course-info", UserVerifyMiddleware, enrollmentController.enrollCourseInfo);
router.get("/get-all-lesson", UserVerifyMiddleware, moduleLessonController.getAllLesson);

// (Admin) API Endpoint:
router.post(
  "/create-new-course",
  UserVerifyMiddleware,
  AdminVerifyMiddleware,
  upload.single("thumbnail"),
  courseController.adminCreateNewCourse
);
router.post(
  "/update-existing-course/:id",
  UserVerifyMiddleware,
  AdminVerifyMiddleware,
  courseController.adminUpdateExistingCourse
);
router.post(
  "/add-instructor",
  upload.single("image"),
  UserVerifyMiddleware,
  AdminVerifyMiddleware,
  instructorController.addNewInstructor
);
router.post(
  "/create-new-lesson",
  UserVerifyMiddleware,
  AdminVerifyMiddleware,
  videoUpload.array("videos"),
  moduleLessonController.adminCreateLesson
);

// Exports
module.exports = router;
```

Main Package: `npm install express cors mongoose dotenv jsonwebtoken bcrypt express-rate-limit helmet npp  express-mongo-sanitize nodemailer nodemon multer cloudinary multer-storage-cloudinary`
