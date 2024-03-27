const jwt = require("jsonwebtoken");

const getUserFromToken = (token) => {
  try {
    console.log("Token received:", token); // Log the token received

    if (token) {
      // Verify the token and extract user information
      const user = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded user information:", user); // Log the decoded user information

      return user; // Return the user information
    }

    return null;
  } catch (error) {
    console.error("Error decoding token:", error); // Log any errors during decoding
    return null; // Return null if there's an error (e.g., token invalid or expired)
  }
};

module.exports = {
  getUserFromToken,
};
