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
      if (roomName.trim() === "") {
        throw new StandardError({
          success: false,
          message: "Room name cannot be blank. Please try again.",
          status: 400,
        });
      }
      const room = await this.roomDao.createRoom({ username, roomName });

      return { success: true, message: room.insertedId };
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }

  async userJoin({ username, roomName }) {
    try {
      if (!roomName || !username) {
        throw new StandardError({
          success: false,
          message: "Invalid input data. Please try again.",
          status: 400,
        });
      }

      const room = await this.roomDao.userJoin({
        username,
        roomName,
      });

      if (!room) {
        throw new StandardError({ status: 400, message: "Invalid input data" });
      }

      return { success: true, message: room.insertedId };
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }

  async getUserJoinById({ id }) {
    try {
      const user = await this.roomDao.getUserJoinById({ id });
      if (!user) {
        throw new StandardError({
          status: 404,
          message: "User join not found",
        });
      }
      return { success: true, message: user };
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }

  async getUserJoinbyRoomName({ roomName }) {
    try {
      const user = await this.roomDao.getUserJoinbyRoomName({ roomName });
      if (!user) {
        throw new StandardError({
          status: 404,
          message: "User join not found",
        });
      }
      return { success: true, message: user };
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }
}

module.exports = RoomService;
