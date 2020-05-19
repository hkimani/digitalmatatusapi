const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const GRoutes = db.define('routes', {
    route_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    agency_id: {
        type: Sequelize.INTEGER,
        references: 'agency',
        referenceKey: 'agency_id'
    },
    route_short_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    route_long_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    route_type: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = GRoutes;
