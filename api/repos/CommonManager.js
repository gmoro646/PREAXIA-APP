var common = require('../helpers/common.js');
var sqlConnection = null;

module.exports = function () {
    var _ = require('underscore');
    var sql = require("mssql");


    this.getConnection = async function () {
        var dbConfig = {
            user: 'preaxia',
            password: 'pre_1234',
            server: 'preaxia.database.windows.net',
            options: {
                encrypt: 'true',
                database: 'preaxia'
            }
        };
        if (sqlConnection)
            return sqlConnection;
        else {
            //sqlConnection = 
            return sqlConnection;
        }
    }

    this.closeConnection = async function (sql) {
        sql.close();
    },

    this.runSqlQuery = async  function (query) {
        //var dbConfig = 'mssql://preaxia:pre_1234@preaxia.database.windows.net/preaxia?encrypt=true';
        var dbConfig1 = 'mssql://Developer:jxV5FE%54&2lqo@forwardhsa-dev.database.windows.net/ForwardHSA-Dev?encrypt=true';

        

        const dbConfig = {
            user: 'Developer',
            password: 'jxV5FE%54&2lqo',
            server: 'forwardhsa-dev.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
            database: 'ForwardHSA-Dev',
         
            options: {
                encrypt: true // Use this if you're on Windows Azure
            }
        }
        
        return new Promise((resolve, reject) => {
            new sql.ConnectionPool(dbConfig).connect().then(pool => {
                return pool.request().query(query)
            }).then(result => {
                resolve(result);
                sql.close();
            }).catch(err => {
                reject(err)
                sql.close();
            });
        });

        // var con = 'mssql://preaxia:pre_1234@preaxia.database.windows.net/preaxia?encrypt=true';
        // var pool = new sql.ConnectionPool(con).connect();
        // const result = await pool.request().query(query);
        // sql.close();
        // return result;

        // await sql.connect('mssql://preaxia:pre_1234@preaxia.database.windows.net/preaxia?encrypt=true')
        // const result = await sql.query(query);
        // sql.close()
        // return result;

        // var con = 'mssql://preaxia:pre_1234@preaxia.database.windows.net/preaxia?encrypt=true';
        // new sql.ConnectionPool(config).connect().then(pool => {
        //     return pool.request().query(query)
        //     }).then(result => {
        //       sql.close();
        //       let rows = result.recordset
        //       res.setHeader('Access-Control-Allow-Origin', '*')
        //       res.status(200).json(rows);
        //     }).catch(err => {
        //       res.status(500).send({ message: "${err}"})
        //       sql.close();
        //     });
        //   });
    },    

    this.getQuery = async function (data, options) {

        return await Initial.find({
            idname_e: "Dr"
        })
    }
}