var common = function (config) {
    config = config;//require('../config/config.js');
    constants = require('../config/constants.js');
    helpers = require('../helpers/helpers.js');
    emailer = require('../helpers/mail.js');
    //mail = common.config.mail();
    crypto = require('crypto');
    pbkdf2 = require('pbkdf2');
    jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
    jwts = require('jwt-simple'); // used to create, sign, and verify tokens
    fs = require('fs');
    path = require("path");
    moment = require("moment");
    async = require("async");
    nodemailer = require('nodemailer')
    smtpTransport = require('nodemailer-smtp-transport');
    flash = require('connect-flash');
    validator = require('validator');
    mongoose = require('mongoose');
    passport = require('passport');
    io = require('socket.io');
}
common.mongoose = require('mongoose');

module.exports = common;
