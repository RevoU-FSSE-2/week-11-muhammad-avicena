const StandardError = require("../utils/constant/standardError");
const { format } = require("date-fns");
const { ObjectId } = require("mongodb");
class RoomDao {
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
        status: 404,
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

  async deleteRoom({ id }) {
    const objectId = new ObjectId(id);
    const getRoom = await this.db
      .collection("rooms")
      .findOne({ _id: objectId });

    if (!getRoom) {
      throw new StandardError({ status: 404, message: "Room not found" });
    }

    const rooms = await this.db
      .collection("rooms")
      .findOneAndUpdate({ _id: objectId }, { $set: { isDeleted: true } });

    return rooms;
  }
}

module.exports = RoomDao;
