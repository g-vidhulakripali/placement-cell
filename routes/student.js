const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");
const passport = require("passport");

router.get("/add", passport.checkAuthentication, studentController.addStudent);
router.post("/create", studentController.create);

module.exports = router;
