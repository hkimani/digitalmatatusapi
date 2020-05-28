const express = require('express');
const logger = require("../controllers/logger");
const router = express.Router();
const jwtOperations = require("../controllers/auth");
const User = require("../models/users");
const Fare = require("../models/fares");
const Contribution = require("../models/contibutions")
const userValidator = require("../controllers/validateUser")

router.get('/', function (req, res, next) {
    logger.info(`Get request from I.P: ${req.connection.remoteAddress}`);
    res.json({
        success: true,
        message: "Server is live"
    })
});

router.post('/googleAuth', function (req, res, next) {
    logger.info(`Account save request from I.P ${req.connection.remoteAddress}`);

    let newUser = new User();

    newUser.email = req.body.email;
    newUser.name = req.body.name;

    // TODO: Fetch google related user details

    newUser.save((err, user) => {
        if (err) {
            logger.error(`Registration failed from I.P: ${req.connection.remoteAddress} error: ${err}`)
            res.status(400).send({
                message: "Registration failed."
            });
        } else {
            logger.success(`Registration successful from I.P: ${req.connection.remoteAddress} User ID: ${user._id}`);
            jwtOperations.generateToken(userValidator.trimUser(user), req, res, next, user._id);
        }
    })
});

router.post('/fare', jwtOperations.verifyToken, function (req, res, next) {
    logger.info(`Contribution request from I.P: ${req.connection.remoteAddress}`);

    let newFare = new Fare();

    newFare.origin_id = req.body.origin_id;
    newFare.destination_id = req.body.destination_id;
    newFare.route_id = req.body.route_id;
    newFare.price = req.body.price;
    newFare.period = req.body.period;
    newFare.user = req.verifiedUser._id;

    newFare.save((err, fare) => {

        if (err) {
            logger.error(`Fare save failed from I.P: ${req.connection.remoteAddress} error: ${err}`)
            res.status(400).send({
                success: false,
                message: "Contribution failed try again later."
            });
        } else {

            logger.success(`Fare saved successfully from I.P: ${req.connection.remoteAddress} Fare ID: ${fare._id}, Updating contributions model ....`);

            // Update contributions
            let newContribution = new Contribution();

            newContribution.contribution_id = fare._id;
            newContribution.user = req.verifiedUser._id;

            newContribution.save((err, contribution) => {
                if (err) {
                    logger.error(`Contribution model update failed from I.P: ${req.connection.remoteAddress} error: ${err}`)
                    res.status(400).send({
                        success: false,
                        message: "Fare saved but contribution failed to associate. No action required"
                    });
                } else {
                    logger.success(`Contribution model updated successfully from I.P: ${req.connection.remoteAddress} Fare ID: ${fare._id}, Contribution ID: ${contribution._id} Updating user model ....`);

                    User.updateOne({ "_id": req.verifiedUser._id }, { $push: { contributions: contribution._id } }, (err, result) => {
                        if (err) {
                            logger.error(`User association with contribution model failed from I.P: ${req.connection.remoteAddress} error: ${err}`)
                            res.status(400).send({
                                success: false,
                                message: "Fare and Contribution saved but user failed to associate. No action required"
                            });
                        } else {
                            logger.success(`User associated successfully from I.P: ${req.connection.remoteAddress} Fare ID: ${fare._id}, Contribution ID: ${contribution._id}, User ID: ${req.verifiedUser._id}`);

                            res.status(200).send({
                                success: true,
                                message: "Contribution successful",
                                info: { contribution_id: contribution._id, fare_id: fare._id }
                            });
                        }
                    })
                }
            })
        }
    });
});

// Add users to db
router.post('/register', function (req, res, next) {
    logger.info(`Request: Register post request from I.P: ${req.connection.remoteAddress}`);

    let newUser = new User();

    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.setPassword(req.body.password);

    newUser.save((err, user) => {

        if (err) {
            logger.error(`Registration failed from I.P: ${req.connection.remoteAddress} error: ${err}`)
            res.status(400).send({
                message: "Registration failed."
            });
        } else {
            logger.success(`Registration successful from I.P: ${req.connection.remoteAddress} User ID: ${user._id}`);
            jwtOperations.generateToken(userValidator.trimUser(user), req, res, next, user._id);
        }
    });
});

// Validate whether user exists
router.post('/login', function (req, res, next) {

    logger.info(`Login request from I.P: ${req.connection.remoteAddress}`);

    // If username is provided
    if (req.body.username) {
        userValidator.validate('username', req, res, next)
        // If email is provided
    } else if (req.body.email) {
        userValidator.validate('email', req, res, next)
    } else {
        //  If nothing is provided
        logger.info(`Login failed from I.P: ${req.connection.remoteAddress} No credentials provided`)
        res.send({
            success: false,
            message: "No credentials provided"
        })
    }
});

// Logout
router.post('/logout', jwtOperations.verifyToken, function (req, res, next) {

    try {
        res.clearCookie("jwtToken");
        res.send({ success: true });
        logger.info(`Logout success from I.P ${req.connection.remoteAddress} user I.D. : ${req.verifiedUser._id}`)

    } catch (error) {
        console.log(error)
        res.send({ success: false, message: "Logout error try clearing cookies" })
    }

})

// Session check
router.post('/login/verify', jwtOperations.verifyToken, function (req, res, next) {
    // With callback function
    User.findById(req.verifiedUser._id, function (err, user) {
        if (err || !user) {
            logger.error(`Failed getting user details from I.P. ${req.connection.remoteAddress}, message: ${err} or not registered`);
            res.send({ authorized: false, message: "Unable to get user. Probably not registered" })
        } else {
            logger.success(`Successfully verified user from database from I.P. ${req.connection.remoteAddress}`)
            res.send({ authorized: true, details: userValidator.trimUser(user) })
        }
    }).select('-password')
});


// Update user details
router.post('/update', jwtOperations.verifyToken, function (req, res, next) {
    logger.info(`Details update request from I.P: ${req.connection.remoteAddress} and user I.D ${req.verifiedUser._id} `)

    User.updateOne({ _id: req.verifiedUser._id }, req.body.fields, function (err, doc) {
        if (err) {
            logger.error(`Failed details update request from I.P: ${req.connection.remoteAddress} and user I.D ${req.verifiedUser._id} `)
            res.send({ success: false, message: err })
        } else {
            logger.success(`Successfully updated details from I.P: ${req.connection.remoteAddress} and user I.D ${req.verifiedUser._id} `)
            res.send({ success: true, message: 'User updated successfully' })
        }
    })
})

module.exports = router;
