const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});

app.listen(port, (req, res) => {
  console.log(`express app is listening on / starting on port : ${port}`);
});
