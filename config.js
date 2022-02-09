const mysql = require("mysql");

const db = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DATABASE}`,
});

// Local database
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "mydb(new)",
// });

module.exports = db;
