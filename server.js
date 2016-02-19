var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var Sequelize = require("sequelize");

var sequelize = new Sequelize("validationDatabase", "root");

var PORT = process.env.NODE_ENV || 9001;

var app = express();

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.get("/", function (req, res) {
  res.render("home");
});

sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("LISTENING!");
  });
});