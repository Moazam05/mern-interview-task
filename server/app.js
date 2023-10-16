const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// Custom Imports
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const countryRouter = require("./routes/countryRoutes");
const AppError = require("./utils/appError");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(express.json());

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

app.get("/", (req, res) => {
	res.send("Test API is running...");
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/country", countryRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
