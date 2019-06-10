console.log("starting api");

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var mongoose = require('mongoose');
var http = require('http');
var debug = require('debug')('project:server');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var process = require('process');
var app = express();
var cors = require('cors');
var sql = require("mssql");
app.use(cors())
var router = express.Router();
router.all('*', cors());
var database=require('./config/dev.config').database
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use('/', serveStatic(__dirname + '/')); // serve static files
app.use('/public', serveStatic(__dirname + '/public')); // serve static files
app.use('/vendors', serveStatic(__dirname + '/vendors')); // serve static files
app.use('/dist', serveStatic(__dirname + '/dist')); // serve static files

router.use(bodyParser.json({ limit: '500mb' }));
router.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

router.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

var env = process.env.NODE_ENV || 'dev';
var config = require('./config/'+env+'.config');

// apply the routes to our application with the prefix /api
app.use('/api/v1/', router);
require('./routes/routes.js')(app); // Main Route File

var server= http.createServer(app);
// catch 404 and forward to error handler

app.listen(config.port, function () {
    console.log('App Listening at port : ' + config.port);
});
mongoose.connect(database, { useNewUrlParser: true },function (err) {
    if (err) {
    console.log("Error connecting in database");
    try { console.log(JSON.stringify(err)); }
    catch (dberr) { console.log(dberr); }
    setTimeout(function () {
    connectToDB();
    }, 1000);
    }
   
    });