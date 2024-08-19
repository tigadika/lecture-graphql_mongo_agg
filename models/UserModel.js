const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static async findByEmail(email) {
    return database.collection("users").findOne({
      email: email,
    });
  }
  static async findById(id) {
    return database.collection("users").findOne({
      _id: new ObjectId(id),
    });
  }
  static async createUser(newUser) {
    try {
      newUser.password = hashPassword(newUser.password);
      return database.collection("users").insertOne(newUser);
    } catch (error) {
      return error;
    }
  }
}

module.exports = User;
