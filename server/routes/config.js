const express = require("express");
const router = express.Router();
const corsOptions = require("../config/corsOptions");

router.get("/config", (req, res) => {
  const data = res.json(corsOptions);
  console.log(data);
});

module.exports = router;
