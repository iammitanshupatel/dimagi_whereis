require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { submitLocation, fetchLocations } = require("./controllers");
const { validateLocationData } = require("./middlewares");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB with Mongoose!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/api/locations", fetchLocations);
app.post("/api/submit-location", validateLocationData, submitLocation);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server listening on port ${port}`));
