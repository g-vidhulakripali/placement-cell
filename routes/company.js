const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company_controller");
const passport = require("passport");

router.get("/home", companyController.company);
router.get("/interview", companyController.interview);

router.post("/create", companyController.create);
router.post("/update/:id", companyController.update);

module.exports = router;
