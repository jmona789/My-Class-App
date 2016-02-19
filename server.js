var express = require("express");
var expressHandlebars = require("express-handlebars");
var Sequelize = require("sequelize");

var sequelize = new Sequelize("validationDatabase", "root");

var PORT = process.env.NODE_ENV || 9001;

var app = express();

sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("LISTENING!");
  });
});