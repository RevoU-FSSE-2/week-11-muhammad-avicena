const StandardError = require("../utils/constant/standardError");
const { ObjectId } = require("mongodb");

class UserDao {
  constructor(db) {
    this.db = db;
  }

  async findAllUsers() {
    return this.db
      .collection("users")
      .find({ isDeleted: { $exists: false } })
      .toArray();
  }

  async getUserById({ id }) {
    const objectId = new ObjectId(id);
    const user = await this.db.collection("users").findOne({ _id: objectId });
    return user;
  }

  async updateUserRole({ id, role }) {
    const objectId = new ObjectId(id);
    const user = await this.db
      .collection("users")
      .findOneAndUpdate({ _id: objectId }, { $set: { role } });

    const getUser = await this.db
      .collection("users")
      .findOne({ _id: objectId });

    if (user.value === null && !getUser) {
      throw new StandardError({ status: 404, message: "User not found" });
    } else {
      const userData = {
        oldVersion: user,
        updatedVersion: getUser,
      };
      return userData;
    }
  }
}

module.exports = UserDao;
