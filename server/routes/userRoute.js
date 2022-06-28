const express = require("express");
const { createUser, findUser } = require("../controllers/userController");
const router = express.Router();

router.post("/login", findUser);
router.post("/", createUser);

module.exports = router;
