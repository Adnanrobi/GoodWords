const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const AuthResolver = {
  Query: {
    loginUser: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error("Invalid credentials");
      }
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    },
  },
  Mutation: {
    registerUser: async (
      _,
      { email, password, firstName, lastName, birthDate, gender }
    ) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          birthDate: birthDate ? new Date(birthDate) : null,
          gender,
        },
      });
      return user;
    },
  },
};

module.exports = AuthResolver;
