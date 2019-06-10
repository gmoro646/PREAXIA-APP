var common = require('../helpers/common.js');
var mongoose = require('mongoose');
var aes256 = require('aes256');
var CommonManager = require('./CommonManager');

module.exports = function () {
    var Core = require('../core/core.js')
    var fs = require('fs');
    var _ = require('underscore');
    // var bcrypt = require('bcryptjs');
    var User = common.mongoose.model('User');
    var CustomError = require('../core/custom-error');
    var key = 'my hashgain';
    // var cipher = aes256.createCipher(key);
    var env = process.env.NODE_ENV || 'dev';
    var config = require('../config/' + env + '.config');
    var util = new CommonManager();

    this.Login = async function (data, options) {
        // let userresult = await User.findOne({ email: data.email, password: data.password });
        // if (userresult) {
        //     return userresult;
        // }
        // else {
        //     throw new CustomError("ACC001");
        // }

        var query = "select * from Account.users where email = '"+ data.email+"'";
        var result = await util.runSqlQuery(query);
        if(result && result.recordset && result.recordset.length > 0 )
        return result.recordset[0];
        else
        throw new CustomError("ACC001");

    }

    this.Register = async function (data, options) {
        let fined = await User.find({ email: data.email });
        if (fined.length > 0) {
            throw new CustomError("ACC002");
        } else {
            var user = new User(data);
            let userresult = await user.save(user);
            if (userresult) {
                delete userresult.password;
                return userresult;
            }
        }
    }

    this.Logout = async function (data, options) {

        return ({ message: "Delete Successfully", data: null });
    }

}