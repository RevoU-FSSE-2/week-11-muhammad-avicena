const { MongoClient } = require("mongodb");

const connectToDb = async () => {
  try {
    const client = await new MongoClient(process.env.DB_PROD).connect();
    const db = client.db(process.env.DB_NAME);
    return db;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
