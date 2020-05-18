const express = require('express');
const logger = require("../controllers/logger");
const router = express.Router();

router.get('/test', function(req, res, next){
    logger.info(`Get request from I.P: ${req.connection.remoteAddress}`);
    res.json({
        success: true,
        message: "Server is live"
    })
});

module.exports = router;
