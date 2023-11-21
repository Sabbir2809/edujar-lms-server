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

// User
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/user-profile-details", UserVerifyMiddleware, userController.userProfileDetails);
router.put("/user-profile-update", UserVerifyMiddleware, userController.userProfileUpdate);
router.get("/verify-email/:email", userController.verifyEmail);
router.get("/verify-otp/:email/:otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);

// Public API Routing Endpoint
router.get("/all-category", categoryController.getAllCategory);
router.get("/top-categories", categoryController.topCategories);
router.get("/all-course", courseController.getAllCourse);
router.get("/course-details/:id", courseController.courseDetails);
router.get("/featured-course", courseController.featuredCourse);
router.get("/all-instructor", instructorController.getAllInstructor);

// Private API Routing Endpoint
router.post("/create-new-course", upload.single("thumbnail"), courseController.adminCreateNewCourse);
router.post("/update-existing-course", courseController.adminUpdateExistingCourse);
router.post("/add-instructor", upload.single("image"), instructorController.addNewInstructor);
router.get("/enroll-course", UserVerifyMiddleware, enrollmentController.courseEnroll);
router.get("/enroll-course-info", enrollmentController.enrollCourseInfo);
router.post("/create-new-lesson", videoUpload.array("videoURL"), moduleLessonController.adminCreateLesson);
router.get("/all-lesson", moduleLessonController.getAllLesson);

// Exports
module.exports = router;
