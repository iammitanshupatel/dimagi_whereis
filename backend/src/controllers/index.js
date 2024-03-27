const Location = require("../Models/Location");
const { getGeonamesLocationData } = require("../services/geonames");

const fetchLocations = async (req, res) => {
  try {
    const locations = await Location.find();

    console.log("Location updated successfully:", locations);
    res.status(200).json(locations);
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
};

const submitLocation = async (req, res) => {
  try {
    const { email, location, timestamp } = req.body;

    const locationData = await getGeonamesLocationData(location);
    if (!locationData) throw new Error("Location not found on Geonames");
    const { lat, lng } = locationData;
    const record = {
      email,
      timestamp: timestamp || Date.now(),
      latitude: lat,
      longitude: lng,
    };
    const existingLocation = await Location.findOne({ email });
    if (existingLocation) {
      existingLocation.set(record);
      await existingLocation.save();
      console.log("Location updated successfully:", existingLocation);
      res.status(200).json(record);
    } else {
      const newLocation = new Location(record);
      const savedLocation = await newLocation.save();
      console.log("Location added successfully:", savedLocation);
      res.status(201).json(record);
    }
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
};

module.exports = { submitLocation, fetchLocations };
