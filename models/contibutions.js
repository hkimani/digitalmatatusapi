const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contributionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    contribution_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fares'
    }

}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } })


const Contributions = mongoose.model('contributions', contributionSchema);

module.exports = Contributions