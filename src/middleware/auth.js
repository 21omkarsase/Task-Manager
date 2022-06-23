const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // req.setHeader("Authorization","k")
    // const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Please authenticate");
  }
  //   next();
};

module.exports = auth;
