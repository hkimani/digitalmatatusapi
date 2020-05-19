const express = require('express');
const logger = require("../controllers/logger");
const conn = require("../controllers/sqlconnect");
const db = require("../controllers/sequelize");
const router = express.Router();

// Test connection
db.authenticate()
    .then(() => { logger.success(`Database connected successfully`) })
    .catch(err => logger.error(`${err}`));


router.get('/createdb', (req, res, next) => {
    logger.info(`Request: Database creation request from ${req.connection.remoteAddress}`)
    let sql = 'CREATE DATABASE digitalmatatus';
    let db = conn.connect();
    db.query(sql, (err, result) => {
        if (err) {
            logger.info(`Error: Database creation failed, Err: ${err}`);
            res.send(`Database creation failed, ${err}`);
        } else {
            logger.info(`Success: Database created successfully, Msg: ${result}`);
            res.send('Database Created')
        }
    })
});

module.exports = router;
