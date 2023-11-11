const jwt = require("jsonwebtoken");

// token encoded
exports.EncodedToken = (email, user_id) => {
  return jwt.sign({ email, id: user_id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

// token decoded
exports.DecodedToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
