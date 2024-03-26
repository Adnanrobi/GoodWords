require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const AuthResolver = require("./resolvers/AuthResolver");
const PostResolver = require("./resolvers/PostResolver");
const { getUserFromToken } = require("./utils/auth");

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: {
        ...AuthResolver.Query,
      },
      Mutation: {
        ...AuthResolver.Mutation,
        ...PostResolver.Mutation,
      },
    },
    context: ({ req }) => {
      // Get user information from the token in the request headers
      const user = getUserFromToken(req.headers.authorization);
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer().catch((error) => {
  console.error("Error starting Apollo Server", error);
});
