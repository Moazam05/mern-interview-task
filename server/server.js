const dotenv = require("dotenv");
// Custom Imports
const app = require("./app");

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
	console.log(err.name, err.message);

	process.exit(1);
});

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
	console.log(`Server in running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! 💥 Shutting down...");
	console.log(err.name, err.message);

	server.close(() => {
		process.exit(1);
	});
});
