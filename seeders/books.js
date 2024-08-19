const { database } = require("../config/mongodb");

async function seeding() {
  const bookDB = database.collection("books");
  const books = require("./books.json");

  const result = await bookDB.insertMany(books);
  console.log(result);
}
seeding();
