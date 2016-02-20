//defining vars for packages and port
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var Sequelize = require("sequelize");

var sequelize = new Sequelize("my_class_db", "root");

var PORT = process.env.NODE_ENV || 9001;

var app = express();

//Serve static content for the app from the "public" directory in the application directory.
app.use("/static", express.static("public"));

//set default layout for handlebar
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));

//set handlevars and view engine
app.set("view engine", "handlebars");

//body parser options
app.use(bodyParser.urlencoded({
  extended: false
}));

var Instructor = sequelize.define("instructor", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$","i"]
    }
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$","i"]
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$","i"]
    }
  }
});

var Student = sequelize.define("student", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$","i"]
    }
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["^[a-z]+$","i"]
    }
  }
});

//home route
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

//sync sequelize and tell server to listen
sequelize.sync({force: true}).then(function () {
  app.listen(PORT, function () {
    console.log("LISTENING ON " + PORT);
  });
});