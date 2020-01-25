"use strict";

const env = require('dotenv').config();


const mysql = require('mysql');

let pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database        : process.env.DB_NAME,
    dateStrings     : true
});


module.exports = pool;
