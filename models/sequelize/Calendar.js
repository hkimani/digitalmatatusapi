const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const Calendar = db.define('calendar', {
    service_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    monday: {
        type: Sequelize.INTEGER,
    },
    tuesday: {
        type: Sequelize.INTEGER,
    },
    wednesday: {
        type: Sequelize.INTEGER,
    },
    thursday: {
        type: Sequelize.INTEGER,
    },
    friday: {
        type: Sequelize.INTEGER,
    },
    saturday: {
        type: Sequelize.INTEGER,
    },
    sunday: {
        type: Sequelize.INTEGER,
    },
    start_date: {
        type: Sequelize.STRING,
    },
    end_date: {
        type: Sequelize.STRING,
    },
});

module.exports = Calendar;
