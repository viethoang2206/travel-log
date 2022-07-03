const jwt = require("jsonwebtoken");
const Travel = require("../model/travel");
const User = require("../model/user");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      if (err) return res.status(403);
      req.user = id;
      next();
    });
  } catch (err) {
    return res.status(403);
  }
};
const verifyUser = async (req, res, next) => {
  const userID = await User.find({ _id: req.body.user });

  authenticateToken(req, res, () => {
    if (req.user.id == userID[0]._id) {
      next();
    } else {
      res.status(403).json("you are not allowed to do this");
    }
  });
};
const verifyTravel = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const travel = await Travel.find({ _id: id });
  console.log("travel", travel[0].user);
  authenticateToken(req, res, () => {
    console.log("req", req.user.id);
    if (req.user.id === travel[0].user) {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};
module.exports = { authenticateToken, verifyUser, verifyTravel };
