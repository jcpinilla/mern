const express = require("express");
const router = express.Router();

const tags = require("./tags");

router.use("/tags", tags);

module.exports = router;