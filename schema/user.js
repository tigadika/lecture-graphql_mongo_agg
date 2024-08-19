const User = require("../models/UserModel");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    phone: String
    address: Address
  }

  type Address {
    street: String
    suite: String
    city: String
  }

  type Token {
    accessToken: String
  }

  input NewUser {
    username: String
    email: String
    password: String
    phone: String
    address: NewAddress
  }

  input NewAddress {
    street: String
    suite: String
    city: String
  }

  type Mutation {
    login(email: String!, password: String!): Token
    register(newUser: NewUser): User
  }
`;

const resolvers = {
  Mutation: {
    login: async (_, args) => {
      try {
        const { email, password } = args;
        const user = await User.findByEmail(email);

        if (!user) {
          throw new Error("email/password invalid");
        }

        const validated = comparePassword(password, user.password);

        if (!validated) {
          throw new Error("email/password invalid");
        }

        const token = {
          accessToken: signToken({
            id: user._id,
            email: user.email,
          }),
        };

        return token;
      } catch (error) {
        throw error;
      }
    },
    register: async (_, args) => {
      try {
        const newUser = args.newUser;

        await User.createUser(newUser);

        return newUser;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
