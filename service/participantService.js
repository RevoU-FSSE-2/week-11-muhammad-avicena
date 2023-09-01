const StandardError = require("../utils/constant/standardError");

class ParticipantService {
  constructor(participantDao) {
    this.participantDao = participantDao;
  }

  async userJoinRoom({ username, roomName }) {
    try {
      if (!roomName || !username) {
        throw new StandardError({
          success: false,
          message: "Invalid input data. Please try again.",
          status: 400,
        });
      }

      const room = await this.participantDao.userJoinRoom({
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

  async getUserJoinRoom({ username, roomName }) {
    try {
      if (!roomName || !username) {
        throw new StandardError({
          success: false,
          message: "Invalid input data. Please try again.",
          status: 400,
        });
      }

      const room = await this.participantDao.getUserJoinRoom({
        username,
        roomName,
      });

      if (!room) {
        throw new StandardError({ status: 400, message: "Invalid input data" });
      }
      return { success: true, message: room };
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }

  async getUserJoinbyRoomName({ roomName }) {
    try {
      const user = await this.participantDao.getUserJoinbyRoomName({
        roomName,
      });
      
      if (user.length > 0) {
        return { success: true, message: user };
      } else {
        throw new StandardError({
          status: 404,
          message: "User join not found",
        });
      }
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }

  async userLeaveRoom({ username }) {
    try {
      const roomData = await this.participantDao.userLeaveRoom({ username });

      if (!roomData) {
        throw new StandardError({
          status: 404,
          message: "User join not found",
        });
      }
      return { success: true, message: roomData };
    } catch (error) {
      console.log(error);
      throw new StandardError({ status: error.status, message: error.message });
    }
  }
}

module.exports = ParticipantService;
