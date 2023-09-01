const StandardError = require("../utils/constant/standardError");
const { format } = require("date-fns");
const { ObjectId } = require("mongodb");
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

  async findAllListRoom() {
    const room = await this.db
      .collection("rooms")
      .find({ isDeleted: { $exists: false } })
      .toArray();
    return room;
  }

  async userJoin({ username, roomName }) {
    const user = await this.db
      .collection("participants")
      .findOne({ username }, { isDeleted: { $exists: false } });

    if (user) {
      throw new StandardError({
        status: 400,
        message: `${username} is exist. Please try another username.`,
      });
    }

    const getRoom = await this.db
      .collection("rooms")
      .findOne({ roomName }, { isDeleted: { $exists: false } });

    if (!getRoom) {
      throw new StandardError({
        status: 400,
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

  async getUserJoin({ username, roomName }) {
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
        status: 400,
        message: "User join not found",
      });
    }

    return getRoom;
  }

  async deleteRoom({ id }) {
    try {
      const objectId = new ObjectId(id);
      const getRoom = await this.db
        .collection("rooms")
        .findOne({ _id: objectId });

      if (!getRoom) {
        throw new Error("Room not found");
      }

      const rooms = await this.db
        .collection("rooms")
        .findOneAndUpdate({ _id: objectId }, { $set: { isDeleted: true } });

      return rooms;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

module.exports = UserDao;
