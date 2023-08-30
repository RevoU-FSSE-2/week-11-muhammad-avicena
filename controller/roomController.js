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

module.exports = {
  createRoom,
};
