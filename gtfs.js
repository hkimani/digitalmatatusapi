const express = require('express');
const logger = require('./controllers/logger');
const app = express();
const routes = require('./routes/sequelize');
const port = 10443;

app.use('/gtfs', routes);

app.listen(port, () => {
    logger.info('Success: Listening on port 10443')
})
