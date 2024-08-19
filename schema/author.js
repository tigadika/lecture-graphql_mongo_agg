const typeDefs = `#graphql


  type Author {
    name: String
    age: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getAuthors: [Author]
  }
`;

const resolvers = {
    Query: {
        getAuthors: () => {
            return [
                {
                    name: "Wahyu",
                    age: 23,
                },
                {
                    name: "Amanda",
                    age: 24,
                },
            ];
        },
    },
};

module.exports = { typeDefs, resolvers };
