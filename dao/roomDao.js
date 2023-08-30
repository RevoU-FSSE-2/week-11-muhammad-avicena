const StandardError = require("../utils/constant/standardError");
const { format } = require("date-fns");

class UserDao {
  constructor(db) {
    this.db = db;
  }

  async createRoom({ roomName, username }) {
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd");
    const user = await this.db
      .collection("users")
      .findOne({ username }, { isDeleted: { $exists: false } });
    if (!user) {
      throw new StandardError({ status: 404, message: "User not found" });
    }

    const getRoom = await this.db
      .collection("rooms")
      .findOne({ roomName }, { isDeleted: { $exists: false } });

    if (getRoom) {
      throw new StandardError({
        status: 400,
        message: `${roomName} room is not available. Please try another.`,
      });
    }

    const roomData = {
      roomName,
      createdBy: username,
      createdDate,
    };

    const room = await this.db.collection("rooms").insertOne(roomData);
    return room;
  }

  async getUserJoin({ username, roomName }) {
    const user = await this.db
      .collection("users")
      .findOne({ username }, { isDeleted: { $exists: false } });
    if (!user) {
      throw new StandardError({ status: 404, message: "User not found" });
    }
    const userData = {
      user,
      roomName,
    };

    return userData;
  }
}

module.exports = UserDao;
