const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const Agency = db.define('agency', {
    agency_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    agency_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    agency_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    agency_timezone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    agency_lang: {
        type: Sequelize.STRING,
        allowNull: false
    },
    agency_phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
});

module.exports = Agency;
