const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company_controller");
const passport = require("passport");

router.get("/home",passport.checkAuthentication, companyController.company);
router.get("/interview",passport.checkAuthentication, companyController.interview);

router.post("/create",passport.checkAuthentication, companyController.create);
router.post("/update/:id", passport.checkAuthentication,companyController.update);

module.exports = router;
