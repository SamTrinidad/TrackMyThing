"use strict";

const express = require('express');
const router = express.Router();
const authenticator = require('../models/authenticator');
const tmp = require('./temperature/start');


//authentication
router.use('*', authenticator);

router.use('/tmp', tmp);

module.exports = router;