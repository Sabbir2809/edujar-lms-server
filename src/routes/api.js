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
router.get("/get-all-lesson", moduleLessonController.getAllLesson);

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
