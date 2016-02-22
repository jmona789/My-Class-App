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


//define models
var Teacher = sequelize.define("teacher", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Teaching_Assistant = sequelize.define("teaching_assistant", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
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
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//define relations between tables
Teaching_Assistant.belongsToMany(Student, {
  through: "class"
});
Student.belongsToMany(Teaching_Assistant, {
  through: "class"
});
Teacher.hasMany(Student);

//routes
app.get("/", function (req, res) {
  Teacher.findAll({
    include: [{
      model: Student
    }]
  }).then(function(teacher) {
    res.render('home', {
      teacher: teacher
    })
  });
});

app.get("/student_register", function (req, res) {
  res.render("student_register");
});

app.get("/instructor_register", function (req, res) {
  res.render("instructor_register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

//posting
app.post("/registerstudent", function (req, res){
  Student.create(req.body).then(function (student) {
    req.session.authenticated = student;
    res.redirect('/');
  }).catch(function (err) {
    res.redirect('/?msg=' + err.message);
  });
});

app.post("/registerInstructor", function (req, res) {
  if (req.body.group1 === "teacher") {
    Teacher.create(req.body).then(function (teacher) {
      req.session.authenticated = teacher;
      res.redirect('/');
    }).catch(function (err) {
      res.redirect('/?msg=' + err.message);
    });
  }else{
    Teaching_Assistant.create(req.body).then(function (teaching_assistant) {
      req.session.authenticated = teaching_assistant;
      res.redirect('/');
    }).catch(function (err) {
      res.redirect('/?msg=' + err.message);
    });
  }
});

//sync sequelize and tell server to listen
sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("LISTENING ON " + PORT);
  });
});