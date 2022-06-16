const express = require("express");
const { route } = require("express/lib/router");
const {
  getTravel,
  createTravel,
  deleteTravel,
  updateTravel,
  updateCount,
} = require("../controllers/travelController");
const router = express.Router();

router.get("/", getTravel);
router.post("/", createTravel);
router.patch("/:id", updateTravel);
router.delete("/:id", deleteTravel);
router.patch("/inc/:id", updateCount);
module.exports = router;
