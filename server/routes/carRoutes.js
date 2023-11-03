const express = require("express");
const authController = require("../controllers/authController");
const carController = require("../controllers/carController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    carController.setCarUserIds,
    carController.createCar
  );

router.route("/:id").get(carController.getCars);

module.exports = router;
