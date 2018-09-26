const express = require("express");
// const exphbs = require("express-handlebars");
const mongoose = require("mongojs");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
var PORT = process.env.PORT || 3000

var databaseUrl = "zoo";
var collections = ["animals"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
  });

  app.get("/", function(req, res) {
    res.send("Hello world");
  });




  app.listen(3000, function() {
    console.log("App running on port 3000!");
  });