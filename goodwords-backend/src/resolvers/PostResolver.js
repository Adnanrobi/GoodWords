const { PrismaClient } = require("@prisma/client");
const { AuthenticationError } = require("apollo-server-express");

const prisma = new PrismaClient();

const PostResolver = {
  Mutation: {
    createPost: async (_, { title, content, categoryIds }, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to create a post");
      }
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: context.user.id,
          categories: { connect: categoryIds.map((id) => ({ id })) },
        },
        include: {
          categories: true,
        },
      });
      return post;
    },

    updatePost: async (_, { postId, title, content, categoryIds }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to update a post");
      }

      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          title,
          content,
          categories: { set: categoryIds.map((id) => ({ id })) },
        },
        include: {
          categories: true,
        },
      });
      return post;
    },

    deletePost: async (_, { postId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to delete a post");
      }

      const post = await prisma.post.delete({
        where: { id: postId },
      });
      return post;
    },
  },
};

module.exports = PostResolver;
