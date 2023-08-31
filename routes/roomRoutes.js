const express = require("express");
const {
  createRoom,
  userJoin,
  getUserJoinbyRoomName,
  getAllListRooms,
  deleteRoom,
} = require("../controller/roomController");

const router = express.Router();

router.post("/", createRoom);
router.get("/list", getAllListRooms);
router.get("/", getUserJoinbyRoomName);
router.post("/join", userJoin);
router.delete("/:id", deleteRoom);

module.exports = router;
