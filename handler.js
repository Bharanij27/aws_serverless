'use strict';

var mysql = require('mysql');
var connection  = mysql.createConnection({
    host     : process.env.dbhost,
    user     : process.env.dbuser,
    password : process.env.dbpassword,
    database : process.env.dbname
  });
  
module.exports.pokemons = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "http://localhost:3000", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: {}
  };
  
  return new Promise((resolve, reject) => {
    const readTable = `SELECT * from pokemonCollection`;
    connection.query(readTable, (err, results, fields) => {
      if (err) {
        response.statusCode = 400;
        const mesg = {
          message : 'Error Occured',
          result: err
        }
        response.body = JSON.stringify(mesg);
        reject(response);
      } else {
        const mesg = {
          message : 'Success',
          result: results
        }
        response.body = JSON.stringify(mesg);
        resolve(response);
      }
    });
  });
};
