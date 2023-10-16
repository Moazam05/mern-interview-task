const express = require("express");
const countryController = require("../controllers/countryController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/:name").get(authController.protect, countryController.country);

module.exports = router;
