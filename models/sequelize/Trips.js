const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const Trips = db.define('trips', {
    trip_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    route_id: {
        type: Sequelize.STRING,
        references: 'routes',
        referencesKey: 'route_id' 
    },
    service_id: {
        type: Sequelize.STRING,
        references: 'calendar',
        referencesKey: 'service_id' 
    },
    trip_headsign: {
        type: Sequelize.STRING,
        allowNull: false
    },
    direction_id: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    shape_id: {
        type: Sequelize.STRING,
        references: 'shapes',
        referencesKey: 'shape_id' 
    }
});

module.exports = Trips;
