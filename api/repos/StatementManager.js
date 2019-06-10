var mongoose = require('mongoose');
var CustomError = require('../core/custom-error');
var common = require('../helpers/common.js');
module.exports = function () {
    var Statement = common.mongoose.model('Statement');


    this.ADDNEWSTATEMENT = async function (body, err) {
        let statementData = new Statement(body)
        let statement = await statementData.save();
        if (statement) {
            return statement
        }
        else {
            throw new CustomError('PRE002');
        }
    }

    this.GETSTATEMENTBYID = async function (body, err) {
        let statement = await Statement.find({ claimand_id: body.id })
        if (statement) {
            return statement
        }
        else {
            throw new CustomError('ACC007');
        }
    }

    this.GETBALANCEBYID = async function (body, err) {
        let statement = await Statement.find({ claimand_id: body.id })
        if (statement) {
            var totalAmount=0;
            for(var i=0;i<statement.length;i++){
                totalAmount=totalAmount+statement[i].amount
            }
            return totalAmount
        }
        else {
            throw new CustomError('ACC007');
        }
    }
}