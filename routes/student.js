const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");
const passport = require("passport");

router.get("/add", passport.checkAuthentication, studentController.addStudent);
router.get(
  "/delete/:id",
  passport.checkAuthentication,
  studentController.delete
);
router.post("/create", passport.checkAuthentication, studentController.create);

module.exports = router;
