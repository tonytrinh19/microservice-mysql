const { text } = require("express");
const express = require("express");
const app = express();
const db = require("./config");
app.use(express.text());
const port = process.env.PORT || 3000;

db.connect();

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
  const body = JSON.parse(req.body);
  const name = body.name;
  const score = body.score;

  const addEntryToTable = `INSERT INTO score (name, score) VALUES (${db.escape(
    name
  )}, ${db.escape(score)})`;
  db.query(addEntryToTable, (err, result) => {
    if (err) {
      res.writeHead(500, { "Access-Control-Allow-Origin": "*" });
      return res.end(
        JSON.stringify({ msg: "Something went wrong! Unable to query." })
      );
    }
    const msg = `${name}:${score} was stored in the DB`;
    console.log(msg);
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    res.end(JSON.stringify({ msg }));
  });
});

app.get("/read", (_, res) => {
  try {
    const getDataQuery = "SELECT * FROM score";
    db.query(getDataQuery, (err, result) => {
      if (err) {
        return res
          .status(500)
          .send({ msg: "Something went wrong! Unable to query." });
      }
      res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
      res.end(JSON.stringify({ query: result }));
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
