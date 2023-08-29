const AuthDao = require("../dao/authDao");
const AuthService = require("../service/authService");

async function loginUser(req, res, next) {
  const { username, password } = req.body;
  const { db } = req;
  try {
    const authDao = new AuthDao(db);
    const authService = new AuthService(authDao);
    const result = await authService.loginUser(username, password);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
        data: { token: result.message },
      });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    next(error);
  }
}

async function registerUser(req, res, next) {
  const { username, password, role } = req.body;
  const { db } = req;
  try {
    if (username && password && role) {
      const userDao = new AuthDao(db);
      const userService = new AuthService(userDao);
      const result = await userService.registerUser(username, password, role);

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: "Successfully created a user",
          data: { _id: result.message },
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: result.message });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginUser,
  registerUser,
};
