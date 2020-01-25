"use strict";



module.exports = (req, res, next) => {

    try{
        // Begin Authentication
        if (!req.body.apiKey){
            res.status(401).send('Invalid API Key');
        }
        else {
            
            const apiKey = req.body.apiKey;
    
            if (typeof apiKey != 'string') throw "not_string";

            if (apiKey != process.env.API_KEY) throw "invalid_key";

            next();
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}
