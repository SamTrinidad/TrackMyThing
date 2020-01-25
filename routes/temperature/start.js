"use strict";

const express = require('express');
const router = express.Router();

const updateML = require('./update');
const getML = require('./get');

router.use('/update', updateML);
router.use('/get', getML);

module.exports = router;