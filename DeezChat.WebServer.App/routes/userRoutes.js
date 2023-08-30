const express = require("express");
const { getAllUsers, updateUserRole } = require("../controller/userController");
const { adminAuthorization, managerAuthorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", adminAuthorization, getAllUsers);
router.patch("/role/:id", managerAuthorization, updateUserRole);

module.exports = router;
