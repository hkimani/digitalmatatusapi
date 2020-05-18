const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const https = require("https");
const socket = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const logger = require("./controllers/logger.js");

var routes = require('./routes/routes.js');
var server;
var socketio;
var port = 9443;
var env = process.env.ENV;
var mongouser = process.env.MONGO_INITDB_ROOT_USERNAME
var mongopassword = process.env.MONGO_INITDB_ROOT_PASSWORD
var app = express();
var whitelist = ['https://weskool.team', 'https://weskool.team', 'http://localhost:8080']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}

var uri = `mongodb://${mongouser}:${mongopassword}@127.0.0.1:27017/digitalmatatus`

// Options
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

// connect to mongodb
mongoose.connect(uri, options, function (err) {
    if (err) {
        logger.info(`Connection error: ${err}`)
    } else {
        logger.info(`Successfully connected to mongo db`)
    }
});

app.use(cors(corsOptions)); // Activate cors
app.use(cookieParser()); // parse cookies // we need this because "cookie" is true in csrfProtection
app.use(bodyParser.urlencoded({ extended: false })); // Body parser Middleware: Code that runs in between the request and the response
app.use(bodyParser.json());
app.use('/api', routes); // Initialize routes
app.use(function (err, req, res, next) { // Custom error middleware 
    // console.log(err)
    logger.info(`Error: on request from: ${req.connection.remoteAddress} message: ${err.message}`);

    // If duplicate entry error
    if (err) {
        res.status(400).send({ error: "Request failed, refer to server logs" })
    }
});

if (env == 'production') {
    // TLS Certificates for https
    var tls = {
        Production: {
            privateKey() {
                return fs.readFileSync(process.env.CERTKEY, 'utf8')
            },
            certificate() {
                return fs.readFileSync(process.env.CERTCHAIN, 'utf8')
            },
        }
    }

    var tlsCredentials = { key: tls.Production.privateKey(), cert: tls.Production.certificate() }
    httpsServer = https.createServer(tlsCredentials, app);
    server = httpsServer.listen(port, () => logger.info("Success: secure server running on from port:::::::" + port));
} else {
    httpsServer = http.createServer(app);
    server = httpsServer.listen(port, () => logger.info("running server on from port:::::::" + port));
}

// Websockets for real time data
socketio = socket(server);
socketio.on('connection', function (client) {
    var address = client.handshake.address;
    logger.info(`Made socket connection, I.D: ${client.id} from I.P: ${address}`);
})
