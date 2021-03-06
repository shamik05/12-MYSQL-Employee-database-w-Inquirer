// Import dependencies
const mysql = require("mysql");
const util = require("util");

// Courtesy of Michał Męciński from https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
// Uses the util module to promisify the mysql module to handle asynchronous behaviour
// Enables use of async/await instead of callback hell
function makeDb() {
  // Database details to create mysql connection
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "&_Q32y^HuOwp",
    database: "employeesDB",
  });

  // Promisifies the query function and returns it
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    // Promisifies the close function and returns it
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

// Exports the promisified mysql function
module.exports = makeDb();
