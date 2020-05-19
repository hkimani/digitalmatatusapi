const Sequelize = require('sequelize');
const db = require("../../controllers/sequelize");

const FeedInfo = db.define('feed_info', {
    feed_info_id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    feed_publisher_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    feed_publisher_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    feed_lang: {
        type: Sequelize.STRING,
        allowNull: false
    },
    feed_start_date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    feed_end_date: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = FeedInfo;
