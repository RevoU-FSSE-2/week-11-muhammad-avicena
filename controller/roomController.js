const RoomDao = require("../dao/roomDao");
const RoomService = require("../service/roomService");

async function createRoom(req, res, next) {
  const { username, roomName } = req.body;
  const { db } = req;

  try {
    const roomDao = new RoomDao(db);
    const roomService = new RoomService(roomDao);
    const result = await roomService.createRoom({ username, roomName });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully created a room",
        data: { _id: result.message },
      });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteRoom(req, res, next) {
  const { id } = req.params;
  const { db } = req;
  try {
    const roomDao = new RoomDao(db);
    const roomService = new RoomService(roomDao);
    const result = await roomService.deleteRoom({ id });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully deleted a room",
        data: result.message,
      });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    next(error);
  }
}

async function getAllListRooms(req, res, next) {
  const { db } = req;
  try {
    const roomDao = new RoomDao(db);
    const roomService = new RoomService(roomDao);
    const result = await roomService.getAllListRoom();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "List of all rooms",
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
  createRoom,
  getAllListRooms,
  deleteRoom,
};
