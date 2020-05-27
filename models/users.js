const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema({
    name: {
        type: String,
    },

    hash: String,

    salt: String,

    phone: {
        type: Number,
        default: 0
    },

    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true
    },

    verified: {
        type: Boolean
    },

    contributions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contibutions',
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Auth
// Method to set salt and hash the password for a user
userSchema.methods.setPassword = function (password) {
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex');
    // Hashing user's salt and password with 100 iterations, 64 length and sha512 digest 
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100, 64, `sha512`).toString(`hex`);
}

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 100, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
}

// Prevent duplicate entries
userSchema.index({ email: 1 }, { unique: true });

// Generate object model for collection: users, using: userSchema
const User = mongoose.model('user', userSchema);

module.exports = User;
