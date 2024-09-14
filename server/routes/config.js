const express = require("express");
const router = express.Router();
const corsOptions = require("../config/corsOptions");

router.get("/api/config/cors", (req, res) => {
  res.json(corsOptions);
});

module.exports = router;
