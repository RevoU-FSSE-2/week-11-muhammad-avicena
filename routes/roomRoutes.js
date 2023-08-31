const express = require("express");
const {
  createRoom,
  userJoin,
  getUserJoinById,
  getUserJoinbyRoomName,
} = require("../controller/roomController");

const router = express.Router();

router.post("/", createRoom);
router.get("/", getUserJoinbyRoomName);
router.get("/:id", getUserJoinById);
router.post("/join", userJoin);

module.exports = router;
