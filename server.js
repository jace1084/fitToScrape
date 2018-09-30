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
var dbConnect = process.env.MONGODB_URI || "mongodb://localhost/local";
if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect(dbConnect);
}

var db = mongoose.connection;
db.on('error',function(err){
    console.log('Mongoose Error',err);
});
db.once('open', function(){
    console.log("Mongoose connection is successful");
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