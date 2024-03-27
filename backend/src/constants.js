const axios = require("axios");
const rateLimit = require("axios-rate-limit");

const geonamesClient = rateLimit(axios.create(), {
  maxRPS: 10,
  windowMs: 3600000,
});

module.exports = { geonamesClient };
