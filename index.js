const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: bookTypeDefs,
  resolvers: bookResolvers,
} = require("./schema/book");

const {
  typeDefs: authorTypeDefs,
  resolvers: authorResolvers,
} = require("./schema/author");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schema/user");

const server = new ApolloServer({
  typeDefs: [bookTypeDefs, authorTypeDefs, userTypeDefs],
  resolvers: [bookResolvers, authorResolvers, userResolvers],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
