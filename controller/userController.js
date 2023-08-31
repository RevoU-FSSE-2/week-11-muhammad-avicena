const UserDao = require("../dao/userDao");
const UserService = require("../service/userService");

async function getAllUsers(req, res, next) {
  const { db } = req;
  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.getAllUser();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "List of users",
        data: result.message,
      });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  const { id } = req.params;
  const { db } = req;
  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.getUserById({ id });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "User found",
        data: result.message,
      });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    next(error);
  }
}

async function updateUserRole(req, res, next) {
  const { id } = req.params;
  const { role } = req.body;
  const { db } = req;
  try {
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.updateUserRole({ id, role });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully updated role",
        data: result.message,
      });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  updateUserRole,
  getUserById
};
