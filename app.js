
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");
const ejs = require("ejs");
const req = require("express/lib/request");
const res = require("express/lib/response");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "capturetheclue",
  });
  const app = express();
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(express.json());
  app.set("view engine","ejs");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname,"static")));
  app.get("/", function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/login2.html"));
  });
  app.post("/auth1", function (request, response) {
    // Capture the input fields
    let email = request.body.email;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (email && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query(
        "SELECT * FROM admin WHERE email = ? AND password = ?",
        [email, password],
        function (error, results, fields) {
          // If there is an issue with the query, output the error
          if (error) throw error;
          // If the account exists
          if (results.length > 0) {
            // Authenticate the user
            request.session.loggedin = true;
            request.session.email = email;
  
            // Redirect to home page
            response.redirect("/addquest");
          } else {
            response.send("Incorrect email and/or Password!");
          }
          // response.end();
        }
      );
    } else {
      response.send("Please enter email and Password!");
      response.end();
    }
  });
  app.post("/signout", function (request, response) {
    if (request.session.loggedin) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
  
      request.session.loggedin = false;
      // Redirect to home page
      response.redirect("/");
    } else {
      response.send("Cannot logout");
    }
    // response.end();
  });
  app.post("/auth2", function (req, res, next) {
    inputData = {
      // first_name: req.body.first_name,
      // last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      
      // gender: req.body.gender,
      // password: req.body.password,
      // confirm_password: req.body.confirm_password,
    };
    inputData2 = {
      // first_name: req.body.first_name,
      // last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      
      // gender: req.body.gender,
      // password: req.body.password,
      // confirm_password: req.body.confirm_password,
    };
    // check unique email address
    var sql = "SELECT * FROM accounts WHERE email =?";
    connection.query(sql, [inputData.email], function (err, data, fields) {
      console.log(msg);
      if (err) throw err;
      if (data.length > 1) {
        var ans = inputData.email + "was already exist";
        alert(ans);
      }
      // else if (inputData.confirm_password != inputData.password) {
      //   var msg = "Password & Confirm Password is not Matched";
      // }
      else {
        // save users data into database
        var sql = "INSERT INTO accounts SET ?";
        connection.query(sql, inputData, function (err, data) {
          if (err) throw err;
        });
        var sql1 = "INSERT INTO user_profiles SET ?";
        connection.query(sql1, inputData2, function (err, data) {
          if (err) throw err;
        });
  
        var msg = "Your are successfully registered";
      }
      console.log(msg);
      res.redirect("/login2");
    });
  });
  app.post("/auth", function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query(
        "SELECT * FROM accounts WHERE username = ? AND password = ?",
        [username, password],
        function (error, results, fields) {
          // If there is an issue with the query, output the error
          if (error) throw error;
          // If the account exists
          if (results.length > 0) {
            // Authenticate the user
            request.session.loggedin = true;
            request.session.username = username;
            // Redirect to home page
            response.redirect("/instructions");
          } else {
            response.send("Incorrect Username and/or Password!");
          }
          // response.end();
        }
      );
    } else {
      response.send("Please enter Username and Password!");
      response.end();
    }
  });
  app.get("/login2", function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/login2.html"));
  });
  app.get("/register2", function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/register2.html"));
  });
  app.get("/instructions", function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/instructions.html"));
  });
  app.get("/addquest", function (req, res, next) {
    if (req.session.loggedin) {
      var sql = "SELECT * FROM add_quest";
      connection.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render("addquest", { title: "User List", userData: data });
      });
    } else {
      res.send("Please login to view this page!");
    }
  });
  app.get("/addquest", function (request, response) {
    if (request.session.loggedin) {
      // Render login template
      response.render("addquest");
    } else {
      response.send("Please login to view this page!");
    }
  });

  app.listen(3000);
