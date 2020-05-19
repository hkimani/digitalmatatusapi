const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const Shapes = db.define('shapes', {
    shape_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    shape_pt_lat: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shape_pt_lon: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shape_pt_sequence: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Shapes;

