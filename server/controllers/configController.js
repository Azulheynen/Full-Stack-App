const corsOptions = require("../config/corsOptions");

const getConfig = (req, res) => {
  res.setHeader("Content-Type", "application/json", "Authorization");
  res.json(corsOptions);
};

module.exports = {
  getConfig,
};
