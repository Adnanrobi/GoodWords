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

  type Category {
    id: ID!
    name: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    categories: [Category!]!
    likes: [Like!]!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: ID!
    post: Post!
    author: User!
    createdAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    author: User!
    createdAt: String!
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

    createPost(
      title: String!
      content: String!
      authorId: Int!
      categoryIds: [Int!]!
    ): Post

    updatePost(
      postId: Int!
      title: String
      content: String
      categoryIds: [Int!]
    ): Post

    deletePost(postId: Int!): Post
  }
`;

module.exports = typeDefs;
