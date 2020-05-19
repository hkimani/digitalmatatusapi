const sql = require('mysql');
const logger = require('./logger');
const user = 'root';
const rootpass = process.env.MYSQL_ROOT_PASSWORD;

function conn() { }

conn.prototype.connect = function () {
    var db = sql.createConnection({
        host: '127.0.0.1',
        user: user,
        password: rootpass,
    });

    db.connect((err) => {
        if (err) {
            logger.info(`Error: Connection not successfull Err: ${err}`)
        } else {
            logger.info(`Success: Mariadb Connected successfully`)
        }
    });
    return db;
}

module.exports = new conn();