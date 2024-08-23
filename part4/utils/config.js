require("dotenv").config();

const mongoUrl = process.env.MONGODB_URI;
const port = process.env.PORT || 3003;

module.exports = { mongoUrl, port };
