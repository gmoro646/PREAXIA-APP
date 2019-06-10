var common = require('../helpers/common.js');
var Core = require('../core/core.js');
var ProcessFactory = require('../core/processFactory.js');
var CustomError = require('../core/custom-error');
module.exports = function (app) {

    var jwt = require('jsonwebtoken');
    var sql = require("mssql");
    // var bcrypt = require('bcryptjs');
    var Logs = common.mongoose.model('Logs');
    var env = process.env.NODE_ENV || 'dev';

    var config = require('../config/' + env + '.config');
       
    app.post('/api/manager', async function (req, res, next) {
        var param = {
            process_id: req.body.PRCID,
            method_id: req.body.Method,
            request_object: req.body.Data,
            created_time: new Date()
        };

        var toReturn = null;
        try {
            var core = new Core(req);
            var incoming = new Logs(param);
            let incomingObj = await incoming.save(incoming);


            var process = new ProcessFactory().getProcessManagerById(param.process_id); // core.getMangerByprocess_id(cnt);
            try {
                let methodResponse = await process[param.method_id](param.request_object, {});
                toReturn = core.wrapResponse(methodResponse);
            } catch (ex) {
                if (ex instanceof CustomError) {
                    toReturn = core.wrapResponse(null, ex.code);
                }
                else {
                    toReturn = core.wrapResponse(null, "ERR000");
                    console.log(ex)
                }
                try {
                    incomingObj.Exception = ex;
                    incomingObj.message = ex.message
                    incomingObj.stack = ex.stack;
                    incomingObj.save();
                } catch (err) {
                    console.log("Exception save error");
                }
            }
        } catch (ex) {
            if (ex instanceof CustomError || (ex && ex.name === "CustomError")) {
                toReturn = core.wrapResponse(null, ex.code);
            }
            else {
                toReturn = core.wrapResponse(null, "ERR000");
                console.log(ex)
            }
            try {
                incomingObj.Exception = ex;
                incomingObj.message = ex.message
                incomingObj.stack = ex.stack;
                incomingObj.save();
            } catch (err1) {
                console.log("Exception save error");
            }
        }
        res.status(200).send(toReturn);
    });
}