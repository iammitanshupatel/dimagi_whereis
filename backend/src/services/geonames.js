const NodeCache = require("node-cache");
const { geonamesClient } = require("../constants");

const cache = new NodeCache({ stdTTL: 3600 });

const getGeonamesLocationData = async (location) => {
  const cachedData = cache.get(location);
  if (cachedData) return cachedData;

  const geonamesResponse = await geonamesClient.get(
    `http://api.geonames.org/searchJSON?q=${location}&username=dimagi&password=dimagi`
  );
  const locationData = geonamesResponse.data.geonames[0];

  cache.set(location, locationData);
  return locationData;
};

module.exports = { getGeonamesLocationData };
