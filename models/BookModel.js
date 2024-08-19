const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Book {
  static collection() {
    return database.collection("books");
  }

  static async addBook(newBook) {
    newBook.createdAt = new Date();
    newBook.updatedAt = new Date();

    return await this.collection().insertOne(newBook);
  }
  static async getBooks(filter) {
    const books = await this.collection().find(filter).toArray();

    console.log(books, "<<<<<");

    return books;
  }
  static async getById(_id) {
    return await this.collection().findOne({ _id: new ObjectId(_id) });
  }
}

module.exports = Book;
