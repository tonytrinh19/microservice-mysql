const express = require("express");
const app = express();
const db = require("./config");
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT || 3000;

db.connect();

console.log(process.env.HOST);

// Create table
const createTableQuery = [
  "CREATE TABLE IF NOT EXISTS score",
  "(id INT AUTO_INCREMENT PRIMARY KEY,",
  "name VARCHAR(255),",
  "score INT)",
].join(" ");

db.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log("Table created!");
});

app.post("/write", (req, res) => {
  const body = req.body;
  console.log(body);
  const name = body.name;
  const score = parseInt(body.score);

  // Insert new entry
  const insertQuery = `INSERT INTO score (name, score) VALUES('${name}', ${score})`;
  db.query(insertQuery, (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });

  res.status(200).send("Write DB Successfully!");
});

app.get("/read", (_, res) => {
  const getDataQuery = "SELECT * FROM score";
  db.query(getDataQuery, (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
