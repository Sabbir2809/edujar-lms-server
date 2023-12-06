// Dependencies
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const courseController = require("../controllers/courseController");
const instructorController = require("../controllers/instructorController");
const upload = require("../utility/multerConfig");
const userController = require("../controllers/userController");
const enrollmentController = require("../controllers/enrollmentController");
const moduleLessonController = require("../controllers/moduleLessonController");
const videoUpload = require("../utility/cloudinaryStorage");
const userVerifyMiddleware = require("../middlewares/userVerifyMiddleware");
const adminVerifyMiddleware = require("../middlewares/adminVerifyMiddleware");

// User Profile API Endpoint:
router.post("/registration", userController.registration);
router.post("/login", userController.login);
<<<<<<< HEAD
router.get(
  "/user-profile-details",
  UserVerifyMiddleware,
  userController.userProfileDetails
);
router.put(
  "/user-profile-update",
  UserVerifyMiddleware,
  userController.userProfileUpdate
);
=======
router.get("/user-profile-details", userVerifyMiddleware, userController.userProfileDetails);
router.put("/user-profile-update", userVerifyMiddleware, userController.userProfileUpdate);
// :::::: password recover ::::::
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b
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
router.get("/course-by-category/:id", courseController.courseByCategory);

// (Private) API Endpoint:
<<<<<<< HEAD
router.get(
  "/enroll-course",
  UserVerifyMiddleware,
  enrollmentController.courseEnroll
);
router.get(
  "/enroll-course-info",
  UserVerifyMiddleware,
  enrollmentController.enrollCourseInfo
);
router.get(
  "/get-all-lesson",
  UserVerifyMiddleware,
  moduleLessonController.getAllLesson
);
=======
router.get("/enroll-course", userVerifyMiddleware, enrollmentController.courseEnroll);
router.get("/enroll-course-info", userVerifyMiddleware, enrollmentController.enrollCourseInfo);
router.get("/get-all-lesson", userVerifyMiddleware, moduleLessonController.getAllLesson);
>>>>>>> e33268eada251067e0e15dae5cb4f2fca848955b

// (Admin) API Endpoint:
router.post(
  "/create-new-category",
  userVerifyMiddleware,
  adminVerifyMiddleware,
  upload.single("categoryImg"),
  categoryController.adminCreateNewCategory
);
router.post(
  "/create-new-course",
  userVerifyMiddleware,
  adminVerifyMiddleware,
  upload.single("thumbnail"),
  courseController.adminCreateNewCourse
);
router.post(
  "/update-existing-course/:id",
  userVerifyMiddleware,
  adminVerifyMiddleware,
  courseController.adminUpdateExistingCourse
);
router.post(
  "/add-instructor",
  upload.single("image"),
  userVerifyMiddleware,
  adminVerifyMiddleware,
  instructorController.addNewInstructor
);
router.post(
  "/create-new-lesson",
  userVerifyMiddleware,
  adminVerifyMiddleware,
  videoUpload.array("videos"),
  moduleLessonController.adminCreateLesson
);

// Exports
module.exports = router;
