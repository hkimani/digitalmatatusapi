const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const CalendarDates = db.define('calendar_dates', {
    service_id: {
        type: Sequelize.STRING,
        references: 'calendar',
        referencesKey: 'service_id'
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exception_type: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = CalendarDates;
