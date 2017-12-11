var config = require('./config');

// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");

// Configure the Express application
// ===========================================================
var app = express();
var PORT = 8080;

// Set up the Express application to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/process/:idprocess", function(req, res) {

  console.log("___ENTER GET REDIRECT___");

  var instprocess = req.query.instprocess;
  var dateref = req.query.dateref;
  var scenario = req.query.cenario;

  var idProcess = req.params.idprocess;
  var urlProcess = config.processMapUrl[idProcess];

  var queryStringArr = [];
  if (instprocess) {
    queryStringArr.push("instprocess=" + instprocess);
  }
  if (dateref) {
    queryStringArr.push("dateref=" + dateref);
  }
  if (scenario) {
    queryStringArr.push("scenario=" + scenario);
  }

  if (queryStringArr.length > 0) {
    urlProcess += "?" + queryStringArr.join('&');
  }

  res.redirect(urlProcess);
});


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});