const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");
const passport = require("passport");
console.log("router loaded");

router.get("/", passport.checkAuthentication, homeController.home);
router.use("/users", require("./users"));
router.use("/student", require("./student"));
router.use("/company", require("./company"));

router.use((req, res) => {
  return res.status(404).render("404", {
    title: "Placement Cell | 404",
  });
});

module.exports = router;
