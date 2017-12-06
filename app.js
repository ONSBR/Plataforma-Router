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

app.get("/redirect", function(req, res) {
  res.redirect(302, '/destination');
});

app.post("/redirect", function(req, res) {
  res.redirect(307, '/destination');
});

app.get("/destination", function(req, res) {
  console.log("___ENTER GET /destination___");

  res.send("Destination page.");
});

app.post("/destination", function(req, res) {
  console.log("___ENTER POST /destination___");

  var reqPayload = req.body;
  console.log("Received reqPayload = " + JSON.stringify(reqPayload, null, 4));

  // Add some additional fields to the response payload
  var resPayload = reqPayload;
  reqPayload.name = "Anya";
  reqPayload.type = "awesome";

  res.json(resPayload);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});