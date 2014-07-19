/*
 * Database API
 *
 * Allows for convenient commands to the MySQL database.
 *
 * model.execute('select * from ?', ['users'], function(err, rows) {
 *   // rows is an array of objects.
 * });
 */

var mysql = require('mysql2');

/*
 * Lol, let's just type all configuration settings here.
 */
var host = 'nextres.mit.edu';
var name = 'radar';
var user = 'alpha';
var password = 'cats';
var db_url = 'mysql://' + host + ':3306/' + name + '?user=' + user + '&password=' + password;
var pool = mysql.createPool(db_url);

exports.execute = function(query, args, callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      callback(err);
    } else {
      connection.query(query, args, function(err, rows, fields) {
        connection.release();
        callback(err, rows, fields);
      });
    }
  });
}

