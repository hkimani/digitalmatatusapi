const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const Frequencies = db.define('frequencies', {
    frequency_id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trip_id: {
        type: Sequelize.INTEGER,
        references: 'trips',
        referencesKey: 'trip_id' // the PK column name
    },
    start_time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    end_time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    headway_secs: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Frequencies;
