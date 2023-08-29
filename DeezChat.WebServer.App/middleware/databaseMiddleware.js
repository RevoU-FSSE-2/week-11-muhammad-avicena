const connectToDb = require("../db/db");

const databaseMiddleware = async (req, res, next) => {
  const db = await connectToDb();
  req.db = db;
  next();
};

module.exports = databaseMiddleware;