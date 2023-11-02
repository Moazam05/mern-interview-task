const mongoose = require("mongoose");
const validator = require("validator");

const carSchema = new mongoose.Schema(
  {
    carModel: {
      type: String,
      required: [true, "Car Model can not be empty!"],
      trim: true,
      minlength: [3, "A car name must have more or equal then 3 characters"],
      maxlength: [40, "A car name must have less or equal then 40 characters"],
    },
    price: { type: Number, required: [true, "Price can not be empty"] },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number can not be empty"],
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "any"); // 'any' means any region
        },
        message: "Please provide a valid Phone number",
      },
    },
    city: {
      type: String,
      required: [true, "A car must have a city name"],
      enum: {
        values: ["Lahore", "Karachi"],
        message: "Difficulty is either: Lahore, Karachi",
      },
    },
    maxPictures: {
      type: Number,
      required: [true, "Max Pictures can not be empty"],
      min: 1,
      max: 10,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Car must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

carSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

const Car = new mongoose.model("Car", carSchema);

module.exports = Car;
