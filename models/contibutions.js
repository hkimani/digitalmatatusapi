const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contributionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    stop_id: {
        type: String,
    },
    route_id: {
        type: String
    },
    contribution: {
        type: 'Number'
    }

}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } })


const Contributions = mongoose.model('contributions', contributionSchema);

module.exports = Contributions