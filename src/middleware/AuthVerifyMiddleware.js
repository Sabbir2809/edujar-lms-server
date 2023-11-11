const { TokenDecoded, EncodedToken } = require("../utility/Token");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    // token validation check
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing, Unauthorized" });
    }
    // decode token
    const decoded = await EncodedToken(token, process.env.JWT_SECRET_KEY);

    // info
    const email = decoded["email"];
    const id = decoded["id"];
    // set to headers
    req.headers.email = email;
    req.headers.id = id;

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
