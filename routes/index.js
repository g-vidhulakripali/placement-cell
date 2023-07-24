const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const passport = require("passport");
const downloadController = require("../controllers/download_controller");

console.log("router loaded");

// Home route
router.get("/", passport.checkAuthentication, homeController.home);

// Users routes
router.use("/users", require("./users"));

// Student routes
router.use("/student", require("./student"));

// Company routes
router.use("/company", require("./company"));

// Download route
router.get(
  "/download",
  passport.checkAuthentication,
  downloadController.download
);

// 404 route - Page Not Found
router.use((req, res) => {
  return res.status(404).render("404", {
    title: "Placement Cell | 404",
  });
});

module.exports = router;
