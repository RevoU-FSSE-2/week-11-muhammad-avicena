const ParticipantDao = require("../dao/participantDao");
const ParticipantService = require("../service/participantService");

async function userJoinRoom(req, res, next) {
  const { username, roomName } = req.body;
  const { db } = req;
  try {
    const roomDao = new ParticipantDao(db);
    const roomService = new ParticipantService(roomDao);
    const result = await roomService.userJoinRoom({ username, roomName });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully joined a room",
        data: { _id: result.message },
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserJoinRoom(req, res, next) {
  const { username, roomName } = req.query;
  const { db } = req;
  try {
    const roomDao = new ParticipantDao(db);
    const roomService = new ParticipantService(roomDao);
    const result = await roomService.getUserJoinRoom({ username, roomName });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "User join found by roomName and username",
        data: result.message,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserJoinbyRoomName(req, res, next) {
  const { roomName } = req.query;
  const { db } = req;
  try {
    const roomDao = new ParticipantDao(db);
    const roomService = new ParticipantService(roomDao);
    const result = await roomService.getUserJoinbyRoomName({ roomName });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "User join found by roomName",
        data: result.message,
      });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (error) {
    next(error);
  }
}

async function userLeaveRoom(req, res, next) {
  const { username } = req.body;
  const { db } = req;
  try {
    const roomDao = new ParticipantDao(db);
    const roomService = new ParticipantService(roomDao);
    const result = await roomService.userLeaveRoom({ username });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully left a room",
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
  userJoinRoom,
  getUserJoinbyRoomName,
  getUserJoinRoom,
  userLeaveRoom,
};
