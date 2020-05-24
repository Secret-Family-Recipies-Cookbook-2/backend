const jwt = require("jsonwebtoken");

// verify users are logged in
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "top secret!";

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        // the token is invalid
        res.status(401).json({ message: "sorry, access denied." });
      } else {
        // the token is good
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please provide the authentication information" });
  }
};