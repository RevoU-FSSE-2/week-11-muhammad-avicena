const express = require("express");
const {
  createRoom,
  getAllListRooms,
  deleteRoom,
} = require("../controller/roomController");

const router = express.Router();

router.post("/", createRoom);
router.get("/", getAllListRooms);
router.delete("/:id", deleteRoom);

module.exports = router;
