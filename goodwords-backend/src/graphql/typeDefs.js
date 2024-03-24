const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String
    lastName: String
    birthDate: String
    gender: String
  }

  type Query {
    loginUser(email: String!, password: String!): String
  }

  type Mutation {
    registerUser(
      email: String!
      password: String!
      firstName: String
      lastName: String
      birthDate: String
      gender: String
    ): User
  }
`;

module.exports = typeDefs;
