const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stopsSchema = new Schema({
    stop_id: { type: String, unique: true },
    fare_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fares'
    }
});

const Stops = mongoose.model('stops', stopsSchema);

module.exports = Stops;
