"use strict";

const express = require('express');
const router = express.Router();

const db = require('../../models/db')


router.post('/', (req, res, next) => {
    try{
        if (!req.body.data){
            throw "No Data"
        } else {

            if (!req.body.data.temperature || !req.body.data.humidity)
                throw "No Temp or Humidity";
            const temp = req.body.data.temperature;
            const hum = req.body.data.humidity;
            const sql = "INSERT INTO apartment_temperature (`temperature`, `humidity`) VALUES (?)";

            db.query(sql, [[temp, hum]], (err, results) => {
                if (err) {
                    res.status(401).send({"Status" : 401, "Msg" : "Failed to update", "Error" : err, "Data" : req.body.data});
                } else {
                    res.status(201).send({"Status" : 201, "Msg" : "Updated", "Data" : req.body.data});
                }
            });
            

            
        }
    } catch (err) {
        res.status(401).send({"Status" : 401, "Msg" : "Failed to update", "Error" : err, "Data" : req.body.data});
    }
});

module.exports = router;