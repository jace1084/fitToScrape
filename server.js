const express = require("express");
// const exphbs = require("express-handlebars");
const mongoose = require("mongojs");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
var path = require("path");
var PORT = process.env.PORT || 3000

var databaseUrl = "scraper";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});
  




  app.listen(3000, function() {
    console.log("App running on port 3000!");
  });