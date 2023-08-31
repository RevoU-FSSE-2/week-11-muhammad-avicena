const bcrypt = require("bcrypt");
const StandardError = require("../utils/constant/standardError");
const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../middleware/config/jwtConfig");

class AuthService {
  constructor(authDao) {
    this.authDao = authDao;
  }

  async loginUser({ username, password }) {
    try {
      const user = await this.authDao.loginUser({ username, password });
      if (!user) {
        throw new StandardError({
          success: false,
          message: "Incorrect username or password. Please try again.",
          status: 401,
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { username: user.username, id: user._id, role: user.role },
          JWT_SIGN
        );
        return { success: true, message: { token, id: user._id } };
      } else {
        throw new StandardError({
          success: false,
          message: "Incorrect username or password. Please try again.",
          status: 401,
        });
      }
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }

  async registerUser({ username, password, gender }) {
    try {
      if (!username || !password || !gender) {
        throw new StandardError({
          success: false,
          message: "Invalid input data. Please try again.",
          status: 400,
        });
      }

      const allowedGender = ["male", "female"];
      if (!allowedGender.includes(gender)) {
        throw new StandardError({
          status: 400,
          message: "Failed to register. Only male and female are allowed",
        });
      }

      if (username.trim() === "") {
        throw new StandardError({
          success: false,
          message: "Username cannot be blank. Please try again.",
          status: 400,
        });
      }

      if (password.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.authDao.registerUser({
          username,
          password: hashedPassword,
          gender,
        });
        return { success: true, message: user.insertedId };
      } else {
        throw new StandardError({
          success: false,
          message:
            "Password should be at least 8 characters and contain alphanumeric characters",
          status: 400,
        });
      }
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }
}

module.exports = AuthService;
