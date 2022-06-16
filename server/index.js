const express = require("express");
//const { PORT } = require("./config");
const connectDB = require("./config/db");
const travelRoute = require("./routes/travelRoute");
const app = express();
const cors = require("cors");
app.use(express.json({ limit: "30mb" }));
app.use(
  express.urlencoded({ limit: "30mb", extended: true, parameterLimit: 50000 })
);
connectDB();
app.use(cors());
app.use("/api/v1/travel", travelRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(cors());
app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
