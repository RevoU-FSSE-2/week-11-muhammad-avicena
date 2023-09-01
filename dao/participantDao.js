const StandardError = require("../utils/constant/standardError");

class ParticipantDao {
  constructor(db) {
    this.db = db;
  }

  async userJoinRoom({ username, roomName }) {
    const user = await this.db
      .collection("participants")
      .findOne({ username }, { isDeleted: { $exists: false } });

    if (user) {
      throw new StandardError({
        status: 404,
        message: `${username} is exist. Please try another username.`,
      });
    }

    const getRoom = await this.db
      .collection("rooms")
      .findOne({ roomName }, { isDeleted: { $exists: false } });

    if (!getRoom) {
      throw new StandardError({
        status: 404,
        message: `${roomName} room doesn't exist. Please try another.`,
      });
    }

    const userData = {
      username,
      roomName,
    };

    const room = await this.db.collection("participants").insertOne(userData);
    return room;
  }

  async getUserJoinbyRoomName({ roomName }) {
    const user = await this.db
      .collection("participants")
      .find({ roomName })
      .toArray();
    return user;
  }

  async getUserJoinRoom({ username, roomName }) {
    const getRoom = await this.db.collection("participants").findOne({
      roomName,
      username,
      isDeleted: { $exists: false },
    });

    console.log(getRoom, "isi get room");
    console.log(username, "isi username");
    console.log(roomName, "isi roomName");

    if (!getRoom) {
      throw new StandardError({
        status: 404,
        message: "User join not found",
      });
    }

    return getRoom;
  }

  async userLeaveRoom({ username }) {
    const user = await this.db
      .collection("participants")
      .findOneAndDelete({ username });
    return user;
  }
}

module.exports = ParticipantDao;
