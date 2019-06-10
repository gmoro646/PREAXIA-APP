var mongoose = require('mongoose');
var CustomError = require('../core/custom-error');
var common = require('../helpers/common.js');
var CommonManager = require('./CommonManager');

module.exports = function () {
    var Claim = common.mongoose.model('Claim');
    var util = new CommonManager();
    var sql = require("mssql");

    //getdependent VIkash

    this.GETDEPENDENT = async function(data, err){
        //data.AccountId = 1
        var query = "select * from HSA.Dependants where AccountId =" + data.AccountId;
        var result = await util.runSqlQuery(query);
        return result.recordset;
    }

    this.ADDNEWCLAIM = async function (data, err) {
        try{
        let temp ="select * from hsa.hsas where accountid =" +data.accountId;
        var hsa = await util.runSqlQuery(temp);

        var HSAId = hsa.recordset[0].HSAId;
        var ServiceProvider = data.provider;

        var EmployeeId = data.employeeId;
        var SubmissionUserId = data.submissionUserId;
        var AccountId = data.accountId;
        var Amount = data.amount;
        var Claimant = null;
        var ServiceDescription = data.serviceDescription
        var Status = data.status
        var SubmissionIpAddress = data.submissionIpAddress;
        var ServiceDate = data.date;
        var SubmissionDate = data.date
        var DependantId = data.dependantId
        var files = data.files
        var result=null;
        //add deopendent id here VIkash

        try {
            var query = "INSERT INTO [HSA].[Claims]([AccountId],[EmployeeId],[HSAId],[Amount],[Claimant],[DependantId],[ServiceDate],[ServiceDescription],[ServiceProvider],[Status],[SubmissionDate],[SubmissionIpAddress],[SubmissionUserId])";
            query = query + "VALUES(" + AccountId + "," + EmployeeId + "," + HSAId + "," + Amount + ",null,"+ DependantId + ",'" +ServiceDate+ "','" + ServiceDescription + "','" + ServiceProvider + "','" + Status + "','" + SubmissionDate +"','" + SubmissionIpAddress + "','" + SubmissionUserId + "')";
            console.log(query);
            result = await util.runSqlQuery(query);

            var queryToGetInsertedData = "select  * from [HSA].[Claims] where  AccountId = " + AccountId;
            var arr = await util.runSqlQuery(queryToGetInsertedData);

            let inserteddata = arr.recordset[arr.recordset.length - 1];

            for(let i=0; i<files.length; i++){
                let Filename = "";
                 Filename = files[i]

            let inserIntoDocument = "INSERT INTO [ForwardHSA-Dev].HSA.SupportingDocuments([AccountId], [EmployeeId], [HSAId], [ClaimId], [Type], [Size], [Filename], [DataReference], [UpdatedDate], [UpdatedUserId])";
            inserIntoDocument = inserIntoDocument + "VALUES(" + AccountId + "," + EmployeeId + "," + HSAId + ",null,'','','"+Filename+"','"+Filename+"', getdate(),'" + SubmissionUserId +"')"
            var finalResult = await util.runSqlQuery(inserIntoDocument);
            }

            return result;
        } catch (e) {
            return result
        }
    }catch(e){
        return result
    }
    }

    this.GETBALANCEBYID = async function (data, options) {
         var query = "select SUM(Amount) AS SUMVALUE from HSA.Transactions where AccountId = "+ data.AccountId;
         var result = await util.runSqlQuery(query);
         let total
         if(result.recordset[0].SUMVALUE){
             total = result.recordset[0].SUMVALUE
         }else{
             total = 0
         }
        return { balance: total, claimed: 110 };
    }

    this.GETSTATEMENTBYID = async function (data, options) {
        var query = "select * from hsa.claims where AccountId = " + data.AccountId;
        var result = await util.runSqlQuery(query);
        return result.recordset;
    }

    this.GETCLAIMBYID = async function (data, options) {
        var query = "select c.* from hsa.claims c where c.AccountId = " + data.AccountId;
        var result = await util.runSqlQuery(query);
        return result.recordset;
    }

    this.GETPOLICYBYID = async function (data, options) {
        try {
            var query = "select ContributionPlanID as policy_number , type as policy_type from Account.ContributionPlans where AccountId = " + data.AccountId;
            var result = await util.runSqlQuery(query);
            return result.recordset;
        } catch (e) {
            console.log(e)
        }
    }
}