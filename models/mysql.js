const mysql = require("mysql");
require("dotenv").config();

const mysqlConnection = mysql.createConnection({
  user: process.env.User,
  password: process.env.Password,
  host: process.env.Host,
  database: process.env.Database,
});

module.exports = mysqlConnection;
