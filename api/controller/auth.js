var common = require('../helpers/common.js');
var Core = require('../core/core.js');
var ProcessFactory = require('../core/processFactory.js');
var CustomError = require('../core/custom-error');

module.exports = function(app) {
    //Models Required
    var Logs = common.mongoose.model('Logs');
    var env = process.env.NODE_ENV || 'dev';
    var config = require('../config/'+env+'.config');
    

    app.post('/api/login', async function(req, res, next) {
        var param = {
            ProcessId: "Auth",
            MethodId: "Login",
            request_object: req.body
        };

        var toReturn = null;
        try {
            var core = new Core();
            var incoming = new Logs(param);
            var incomingObj = await incoming.save(incoming);

            res.setHeader('Content-Type', 'application/json');
            var process = new ProcessFactory().getProcessManagerById(param.ProcessId); // core.getMangerByProcessId(cnt);
            console.log(process)
            try {
                let methodResponse = await process[param.MethodId](param.request_object, {});
                console.log(methodResponse)
                toReturn = core.wrapResponse(methodResponse);
            } catch (ex) {
                console.log(ex)
                if (ex instanceof CustomError)
                    toReturn = core.wrapResponse(null, ex.code);
                else if (ex instanceof MongoError)
                    toReturn = core.wrapResponse(null, "PRC002");
                else
                    toReturn = core.wrapResponse(null, "PRC002");
                incomingObj.Exception = ex;
            }
        } catch (ex) {
            console.log(ex)
            toReturn = core.wrapResponse(null, "PRC001");
            incomingObj.Exception = ex;
        }
        console.log(toReturn)
        res.status(200).send(toReturn);
    });

    app.post('/api/register', async function(req, res, next) {
        var param = {
            ProcessId: "Auth",
            MethodId: "Register",
            request_object: req.body,
            created_time: new Date()
        };

        var toReturn = null;
        try {
            var core = new Core();
            var incoming = new Logs(param);
            let incomingObj = await incoming.save(incoming);

            res.setHeader('Content-Type', 'application/json');
            var process = new ProcessFactory().getProcessManagerById(param.ProcessId); // core.getMangerByProcessId(cnt);
            console.log("here");
            try {
                let methodResponse = await process[param.MethodId](param.request_object, {});
                toReturn = core.wrapResponse(methodResponse);
            } catch (ex) {
                if (ex instanceof CustomError)
                    toReturn = core.wrapResponse(null, ex.code);
                else if (ex instanceof MongoError)
                    toReturn = core.wrapResponse(null, "PRC002");
                else
                    toReturn = core.wrapResponse(null, "PRC002");
                incomingObj.Exception = ex;
                incoming.save(incoming);
            }
        } catch (ex) {
            toReturn = core.wrapResponse(null, "PRC001");
            incomingObj.Exception = ex;
            incoming.save(incoming);
        }
        res.status(200).send(toReturn);
    });

    app.post('/api/logout', async function(req, res, next) {
        var param = {
            ProcessId: "Auth",
            MethodId: "Logout",
            request_object: req.body,
            created_time: new Date()
        };

        var toReturn = null;
        try {
            var core = new Core();
            var incoming = new Logs(param);
            let incomingObj = await incoming.save(incoming);

            res.setHeader('Content-Type', 'application/json');
            var process = new ProcessFactory().getProcessManagerById(param.ProcessId); // core.getMangerByProcessId(cnt);
            try {
                let methodResponse = await process[param.MethodId](param.request_object, {});
                toReturn = core.wrapResponse(methodResponse);
            } catch (ex) {
                toReturn = core.wrapResponse(null, "PRC002");
                incomingObj.Exception = ex;
            }
        } catch (ex) {
            toReturn = core.wrapResponse(null, "PRC001");
            incomingObj.Exception = ex;
        }
        res.status(200).send(toReturn);
    });

 
}