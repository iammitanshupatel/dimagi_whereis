const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  timestamp: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

module.exports = mongoose.model("Location", locationSchema);
