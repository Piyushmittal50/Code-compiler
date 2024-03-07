const express = require("express");
const app = express();
const port = 8000;

app.get("/compile", (req, res) => {
  res.send("Hello World!");
});
