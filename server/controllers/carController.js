const Car = require("../models/carModel");
const factory = require("./handleFactory");

exports.setCarUserIds = (req, res, next) => {
  console.log("req", req);
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllCars = factory.getAll(Car);
exports.createCar = factory.createOne(Car);
