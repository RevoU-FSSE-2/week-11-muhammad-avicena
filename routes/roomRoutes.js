const express = require('express');
const { createRoom } = require("../controller/roomController");

const router = express.Router();

router.post("/", createRoom);

module.exports = router;