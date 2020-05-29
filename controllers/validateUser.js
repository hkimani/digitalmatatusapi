const logger = require("./logger");
const User = require("../models/users");
const jwtOperations = require("./auth");

function validator() {
    this.returnType = 'non';
}

// Validate existing user
validator.prototype.validate = function (type, req, res, next) {

    var instance = this;

    // Use variable for object key and value
    var obj = {};
    obj[type] = req.body[type]

    // resolves to the Mongoose document if MongoDB found a document with the given id, or null if no document was found.
    User.findOne(obj, function (err, user) {
        if (user) {
            // Resolve password
            if (user.validPassword(req.body.password)) {
                logger.success(`Login successful from I.P: ${req.connection.remoteAddress} User ID: ${user._id}`);

                // Get chats then generate token
                jwtOperations.generateToken(instance.trimUser(user), req, res, next, user._id);

            } else {
                logger.error(`Login failed from I.P: ${req.connection.remoteAddress} Invalid credentials provided`)
                res.send({
                    success: false,
                    message: "Invalid login details "
                })
            }

        } else {
            logger.error(`Login failed from I.P: ${req.connection.remoteAddress} Invalid User type error: ${err}`)
            res.send({
                success: false,
                message: "User credentials not found"
            })
        }
    }).catch(next);
}

// valide Google auth
validator.prototype.validateGoogleAuth = async function (type, req, res, next) {

    var instance = this;

    // Use variable for object key and value
    var obj = {};
    obj[type] = req.body[type];

    // resolves to the Mongoose document if MongoDB found a document with the given id, or null if no document was found.
    return await User.findOne(obj, function (err, user) {
        if (user) {
            logger.success(`Found user from I.P: ${req.connection.remoteAddress} User ID: ${user._id}`);
            instance.returnType = true;
        } else {
            logger.error(`User not found, failed from I.P: ${req.connection.remoteAddress} Invalid User type error: ${err}`);
            instance.returnType = false;
        }
    }).catch(next);


}

validator.prototype.trimUser = function (user) {
    var newUser = JSON.parse(JSON.stringify(user))
    delete newUser.salt;
    delete newUser.hash;

    return newUser;
}


module.exports = new validator
