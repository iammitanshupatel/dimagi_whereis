const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateLocationData = (req, res, next) => {
  const { email, location } = req.body;
  if (!email || !location) {
    return res.status(400).json({ error: "Email and location are required!" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Email must be valid" });
  }
  next();
};

module.exports = { validateLocationData };
