const { format } = require("date-fns");
const StandardError = require("../utils/constant/standardError");

class AuthDao {
  constructor(db) {
    this.db = db;
  }

  async loginUser({ username }) {
    try {
      const user = await this.db.collection("users").findOne({ username });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async registerUser({ username, password, email, gender }) {
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd");
    const role = "member";

    const userData = {
      username,
      password,
      role,
      email,
      gender,
      createdDate,
    };
    
    const isUserTaken = await this.db.collection("users").findOne({ username });
    if (isUserTaken) {
      throw new StandardError({
        success: false,
        message: "User already taken",
        status: 400,
      });
    }
    const result = await this.db.collection("users").insertOne(userData);
    return result;
  }
}

module.exports = AuthDao;
