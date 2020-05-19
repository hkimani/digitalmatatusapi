const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const Stops = db.define('stops', {
    stop_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    stop_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stop_lat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stop_lon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location_type: {
        type: Sequelize.STRING,
    },
    parent_station: {
        type: Sequelize.STRING,
    },
});

module.exports = Stops;
