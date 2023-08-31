const express = require("express");
const {
  getAllUsers,
  updateUserRole,
  getUserById,
} = require("../controller/userController");
const {
  adminAuthorization,
  managerAuthorization,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", adminAuthorization, getAllUsers);
router.get("/:id", getUserById);
router.patch("/role/:id", managerAuthorization, updateUserRole);

module.exports = router;
