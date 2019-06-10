const userModel = require('../model/User');
const logsModel = require('../model/Log');
const claimModel = require('../model/Claim');
const statementModel = require('../model/Statement');
module.exports = function (app) {
    require('../controller/auth')(app); // for authentication
    require('../controller/shared')(app); // for all api to get data 

}