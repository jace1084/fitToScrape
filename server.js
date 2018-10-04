const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
var cheerio = require("cheerio");
const app = express();
var path = require("path");
var PORT = process.env.PORT || 3000
var Comments = require("./models/Comments.js");
var Article = require("./models/Article.js");
var Save = require("./models/Save.js");
var logger = require("morgan");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// var databaseUrl = "scraper";
// var collections = ["articles"];

app.use(express.static("./public"));

mongoose.Promise = Promise;

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/jobScrape";

// Database configuration with mongoose
mongoose.connect(dbURI);

const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
    // start the server, listen on port 3000
    app.listen(PORT, function() {
        console.log("App running on port" + PORT);
    })
});
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

require("./routes/scrape")(app);
require("./routes/html.js")(app);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

  app.listen(PORT, function() {
    console.log("App running on port 3000!");
  });