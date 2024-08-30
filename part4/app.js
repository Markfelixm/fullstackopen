const config = require("./utils/config");

const express = require("express");
require("express-async-errors");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");

mongoose
	.connect(config.mongoUrl)
	.then(() => {
		logger.info("connected to MongoDB\n---");
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message);
	});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
