const express = require("express");
const { route } = require("express/lib/router");
const { verifyUser, verifyTravel } = require("../helper/jwtHelper");
const {
  getTravel,
  createTravel,
  deleteTravel,
  updateTravel,
  updateCount,
  getAllTravel,
  findTitle,
} = require("../controllers/travelController");
const router = express.Router();

router.get("/", getAllTravel);
router.get("/:id", getTravel);
router.get("/post/search", findTitle);
router.post("/", verifyUser, createTravel);
router.patch("/:id", verifyTravel, updateTravel);
router.delete("/:id", verifyTravel, deleteTravel);
router.patch("/inc/:id", verifyTravel, updateCount);
module.exports = router;
