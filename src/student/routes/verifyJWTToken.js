const jwt = require("jsonwebtoken");

const verifyJWTToken = (req, res, next) => {
  const auth = req.header("Authorization") || req.header("authorization");
  if (!auth) {
    return res.status(401).send("Access denied.");
  }

  const token = auth.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = verifyJWTToken;
