const StandardError = require("../utils/constant/standardError");

class RoomService {
  constructor(roomDao) {
    this.roomDao = roomDao;
  }

  async createRoom({ username, roomName }) {
    try {
      if (!username || !roomName) {
        throw new StandardError({
          success: false,
          message: "Invalid input data. Please try again.",
          status: 400,
        });
      }
      if (username.trim() === "") {
        throw new StandardError({
          success: false,
          message: "Room name cannot be blank. Please try again.",
          status: 400,
        });
      }

      const room = await this.roomDao.createRoom({ username, roomName });

      return { success: true, message: room.insertedId };
    } catch (error) {
      throw new StandardError({ status: 500, message: error.message });
    }
  }
}

module.exports = RoomService;
