"use strict";

const express = require('express');
const router = express.Router();

const db = require('../../models/db');


router.post('/', (req, res, next) => {
    try{

        const sql = "SELECT * FROM apartment_temperature ORDER BY timestamp DESC LIMIT 500";

        db.query(sql, [], (err, results) => {
            if (err) {
                res.status(401).send({"Status" : 401, "Msg" : "Failed to get information", "Error" : err, "Data" : req.body.data});
            } else {
                res.status(201).send({"Status" : 201, "Msg" : "Retrieved Temperature and Humidity Levels", "Data" : results});
            }
        });
        
    } catch (err) {
        res.status(401).send({"Status" : 401, "Msg" : "Failed to get information", "Error" : err, "Data" : req.body.data});
    }
});

module.exports = router;