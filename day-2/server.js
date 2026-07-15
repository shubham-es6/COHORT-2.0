const express = require("express");

const app = express(); //server instance create karna

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("This is about page");
});

app.get("/home", (req, res) => {
  res.send("This is home page");
});

app.listen(3000); // server start karna
