const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const databaseMiddleware = require("./middleware/databaseMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const connectMongoDb = require("./db/db");
require("dotenv").config();

const app = express();

// Import router
const indexRouter = require("./routes/indexRoutes");
const authRouter = require("./routes/authRoutes");

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(databaseMiddleware);

// Use router
app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);

// Check connection to database
async function connectDatabase() {
  try {
    await connectMongoDb();
    console.log("Succesfully connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connectDatabase();

app.use(errorHandlerMiddleware);

// App listeners
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

module.exports = app;
