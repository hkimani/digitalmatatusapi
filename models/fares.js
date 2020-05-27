const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fareSchema = new Schema({
    origin_id: {
        type: String,
        required: true
    },
    destination_id: {
        type: String,
        required: true
    },
    route_id: {
        type: String
    },
    period: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    price: {
        type: Number,
        required: true
    },
    contributions: {
        type: Array,
        default: []
    }
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

const Fares = mongoose.model('fares', fareSchema);

module.exports = Fares
