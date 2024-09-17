const express = require("express");
const router = express.Router();
const corsOptions = require("../config/corsOptions");
const { getConfig } = require("../controllers/configController");

router.get("/", getConfig);

module.exports = router;
