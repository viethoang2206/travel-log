const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
exports.findUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username });
  if (user.length === 0) {
    res.status(404).json({
      success: false,
      message: "Can't find user",
    });
  } else {
    bcrypt.compare(password, user[0].password, (err, matches) => {
      if (err) {
        console.log("Wrong password");
      } else if (matches) {
        const id = user[0].id;
        const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({
          token,
          success: true,
          data: user[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Wrong password or username",
        });
      }
    });
  }
};
exports.createUser = async (req, res) => {
  const { username, password, lastname, firstname } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    lastname,
    firstname,
    username,
    password: hashed,
  }).catch((err) => {
    res.status(400).json({
      success: false,
      message: err,
    });
  });
  res.status(201).json({
    success: true,
    message: newUser,
  });
};
