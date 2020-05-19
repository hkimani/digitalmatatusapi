const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const StopTimes = db.define('stop_times', {
    stop_time_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    trip_id: {
        type: Sequelize.INTEGER,
        references: 'trips',
        referencesKey: 'trip_id' // the PK column name
    },
    arrival_time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    departure_time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stop_id: {
        type: Sequelize.INTEGER,
        references: 'stops',
        referencesKey: 'stop_id' // the PK column name
    },
    stop_sequence: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = StopTimes;
