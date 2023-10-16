const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
// Custom Imports
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

let userList = [];

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const { name, email, password, passwordConfirm } = req.body;

	// Validate Email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return next(new AppError("Invalid email address", 400));
	}

	// Check if email already exists
	const existingUser = userList.find((user) => user.email === email);
	if (existingUser) {
		return next(new AppError("Email already exists", 400));
	}

	// Validate Password
	if (!password) {
		return next(new AppError("Password is required", 400));
	}
	if (!passwordConfirm) {
		return next(new AppError("PasswordConfirm is required", 400));
	}
	if (password.length < 8 || passwordConfirm.length < 8) {
		return next(
			new AppError("Password must be at least 8 characters long", 400)
		);
	}

	// Check if password and passwordConfirm match
	if (password !== passwordConfirm) {
		return next(new AppError("Passwords do not match", 400));
	}

	const hashPassword = await bcrypt.hash(password, 12);

	const newUser = {
		id: uuidv4(),
		name,
		email,
		password: hashPassword,
	};

	const token = signToken(newUser.id);
	userList.push(newUser);

	console.log("userList", userList);

	res.status(201).json({
		status: "success",
		token,
		data: {
			user: newUser,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email ann password exist
	if (!email || !password) {
		return next(new AppError("Please provide email and password", 400));
	}

	// 2) Check if user exists and password is exist
	const user = await userList.find((user) => user.email === email);
	if (!user) {
		return next(new AppError("Incorrect email or password", 401));
	}
	const correct = await bcrypt.compare(password, user.password);

	if (!correct) {
		return next(new AppError("Incorrect email or password", 401));
	}

	// 3) If everything is ok, send token to client
	const token = signToken(user.id);

	res.status(200).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return next(
			new AppError("You are not logged in! Please log in to get access.", 401)
		);
	}

	// 2) Verification token
	const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const freshUser = await userList.find((user) => user.id === decode.id);

	if (!freshUser) {
		return next(
			new AppError(
				"The user belonging to this token does no longer exist.",
				401
			)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = freshUser;
	next();
});
