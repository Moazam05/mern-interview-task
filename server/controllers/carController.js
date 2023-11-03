const Car = require("../models/carModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.setCarUserIds = (req, res, next) => {
  console.log("req", req);
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createCar = factory.createOne(Car);

exports.getCars = catchAsync(async (req, res, next) => {
  const query = Car.find({ user: req.params.id });

  const docs = await query;

  if (!docs) {
    return next(new AppError("No documents found for this user", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: docs,
    },
  });
});
