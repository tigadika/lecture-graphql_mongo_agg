const Book = require("../models/BookModel");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    _id: ID
    title: String
    authorId: String
    price: Int
    stock: Int
    images: [String]
    excerpt: String
    tags: [String]
  }
  
  type Query {
    getBooks: [Book]
    getBookByTitle(title: String): Book
    getBookById(_id: ID): Book
  }

  input NewBook {
    title: String
    authorId: String
    price: Int
    stock: Int
    images: [String]
    excerpt: String
    tags: [String]
  }

  type Mutation {
    addBook(newBook: NewBook): Book
  }
`;

const resolvers = {
  Query: {
    getBooks: async () => {
      const books = await Book.getBooks();
      return books;
    },
    getBookByTitle: async (parent, args) => {
      const { title } = args;
      // const book = books.find((el) => el.title === title);
      const book = await Book.getBooks({ title });

      if (book.length === 0) {
        throw new Error("Ups book not found");
      }

      return book[0];
    },
    getBookById: async (parent, args) => {
      const { _id } = args;
      const book = await Book.getById(_id);

      if (!book) {
        throw new Error("Ups book not found");
      }

      return book;
    },
  },
  Mutation: {
    addBook: async (parent, args) => {
      // const { title, author } = args.NewBook;
      const newBook = args.newBook;
      // books.push(newBook);
      await Book.addBook(newBook);

      return newBook;
    },
  },
};

module.exports = { typeDefs, resolvers };
