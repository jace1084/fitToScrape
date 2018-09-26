const express = require("express");
// const exphbs = require("express-handlebars");
const mongoose = require("mongojs");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
var PORT = process.env.PORT || 3000