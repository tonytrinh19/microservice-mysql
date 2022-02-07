const express = require("express");
const app = express();
const db = require("./config");
// require("dotenv").config();
app.use(express.json());
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
  if (err)
    return res
      .status(500)
      .send({ msg: "Something went wrong! Unable to create table." });
  console.log("Table created!");
});

app.post("/write", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  try {
    const body = req.body;
    console.log(body);
    if (!body) {
      return res
        .status(404)
        .send({ msg: "Cannot send an empty POST request." });
    }
    const name = body.name.toLowerCase().trim();
    const score = parseInt(body.score);

    // Insert new entry
    const insertQuery = `INSERT INTO score (name, score) VALUES('${name}', ${score})`;
    db.query(insertQuery, (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ msg: "Something went wrong! Unable to query." });
      console.log("1 record inserted");
      res
        .status(200)
        .send({ msg: `${name}: ${score} was stored in the Database.` });
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", (_, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  try {
    const getDataQuery = "SELECT * FROM score";
    db.query(getDataQuery, (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ msg: "Something went wrong! Unable to query." });
      res.status(200).send({ query: result });
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
