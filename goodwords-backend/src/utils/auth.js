const jwt = require("jsonwebtoken");

const getUserFromToken = (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getUserFromToken,
};
