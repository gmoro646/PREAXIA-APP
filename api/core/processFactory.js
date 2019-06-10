module.exports = function () {

    var UserManager = require('../repos/UserManager.js');
    var AuthManager = require('../repos/AuthManager.js');
    var CommonManager = require('../repos/CommonManager.js');
    var ClaimManager = require('../repos/ClaimManager.js');
    var StatementManager = require('../repos/StatementManager.js');
    this.getProcessManagerById = function (processId) {
        var manager = null;
        switch (processId) {
            case "User":
                manager = new UserManager();
                break;
            case "Auth":
                manager = new AuthManager();
                break;
            case "Common":
                manager = new CommonManager();
                break;
            case "Claim":
                manager = new ClaimManager();
                break;
            case "Statement":
                manager = new StatementManager();
                break;
        }
        return manager;
    }
}