const express = require("express");
const authController = require("../controllers/authController");
const carController = require("../controllers/carController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, carController.getAllCars)
  .post(
    authController.protect,
    carController.setCarUserIds,
    carController.createCar
  );

module.exports = router;
