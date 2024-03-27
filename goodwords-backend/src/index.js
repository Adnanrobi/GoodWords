// Import required modules
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const AuthResolver = require("./resolvers/AuthResolver");
const PostResolver = require("./resolvers/PostResolver");
const CategoryResolver = require("./resolvers/CategoryResolver"); // Import the CategoryResolver
const { getUserFromToken } = require("./utils/auth");
const { PrismaClient } = require("@prisma/client");

// Initialize Prisma client
const prisma = new PrismaClient();

// Start the Apollo Server
async function startApolloServer() {
  // Create an Express app
  const app = express();

  // Create an Apollo Server instance
  const server = new ApolloServer({
    typeDefs, // GraphQL type definitions
    resolvers: {
      Query: {
        ...AuthResolver.Query,
        ...CategoryResolver.Query, // Include CategoryResolver's Query resolvers
      },
      Mutation: {
        ...AuthResolver.Mutation,
        ...PostResolver.Mutation,
        ...CategoryResolver.Mutation, // Include CategoryResolver's Mutation resolvers
      },
      ...CategoryResolver, // Include CategoryResolver's resolvers
    },
    context: ({ req }) => {
      // Log request headers
      console.log("Request Headers:", req.headers);

      // Get user information from the token in the request headers
      const user = getUserFromToken(req.headers.authorization);
      return { user, prisma }; // Include Prisma client instance in the context
    },
  });

  // Start the Apollo Server
  await server.start();

  // Apply middleware to Express app
  server.applyMiddleware({ app });

  // Define the port
  const PORT = process.env.PORT || 4000;

  // Start listening on the specified port
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

// Call the function to start the Apollo Server
startApolloServer().catch((error) => {
  console.error("Error starting Apollo Server", error);
});
