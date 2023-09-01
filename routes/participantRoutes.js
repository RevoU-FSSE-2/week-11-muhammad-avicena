const express = require("express");
const {
  userJoinRoom,
  getUserJoinbyRoomName,
  getUserJoinRoom,
  userLeaveRoom,
} = require("../controller/participantController");

const router = express.Router();

router.post("/", userJoinRoom);
router.get("/", getUserJoinRoom);
router.get("/list", getUserJoinbyRoomName);
router.delete("/", userLeaveRoom);

module.exports = router;
