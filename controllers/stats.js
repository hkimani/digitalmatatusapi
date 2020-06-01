const User = require("../models/users");
const Fare = require("../models/fares");
const Contribution = require("../models/contibutions");
const logger = require("./logger");

function stats() {}

stats.prototype.fetchGeneralStats = function (req, res, next){
    Contribution.countDocuments(function(err, results){
        if (err) {
            logger.error(`Failed to get general stats from I.P. ${req.connection.remoteAddress}, message: ${err} or not registered`);
            res.send({ success: false, message: "Unable to fetch stats, something happended" })
        } else {
            if (results) {
                logger.success(`General stats fetch success from I.P. ${req.connection.remoteAddress}`);
                res.send({ success: true, message: "Contributions found", stats: {total_contributions: results} })
            } else {
                logger.error(`General stats request failed from I.P. ${req.connection.remoteAddress} Records may not be available`);
                res.send({ success: false, message: "No contributions made" })
            }
        }
    });
    
}

module.exports = new stats;
