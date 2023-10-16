const express = require("express");
const countryController = require("../controllers/countryController");

const router = express.Router();

router.route("/:name").get(countryController.country);

module.exports = router;
