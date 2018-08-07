// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");

var Article = require("./models/article.js");


// For Express
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));

//Handlebars
var exphbs = require("express-handlebars");
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraperdb");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});


//Routes
app.get("/", function(req, res) {
    Article.find({"saved": false}, function(error, data) {
      var hbsObject = {
        article: data
      };
      console.log(hbsObject);
      res.render("homePage", hbsObject);
    });
  });


app.listen(port, function () {
    console.log("localhost:" + port);
});