var config = require('./config');
var CoreRepository = require('../Plataforma-SDK/services/CoreRepository');
var CoreStorage = require("../Plataforma-SDK/services/CoreStorage");

// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");

// Configure the Express application
// ===========================================================
var app = express();
var PORT = config.PORT;

// Set up the Express application to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var coreRepository = new CoreRepository();
var sto = new CoreStorage();

// Add headers
app.use(function (req, res, next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', false);
  
      // Pass to next layer of middleware
      next();
  });

var presentationEvent = "PresentationEvent";

app.post("/event", function(req, res) {

  console.log("___EVENT ARRIVED ID ROUTER___" + JSON.stringify(req.body));

  var evento = req.body;

  var listaEventos = sto.head(presentationEvent);
  if (listaEventos == undefined) {
    listaEventos = [];
  }
  listaEventos.push(evento);

  sto.commit(evento.origem, listaEventos, presentationEvent);  

});

app.get("/event", function(req, res) {
  
    console.log("___GETEVENT ARRIVED___" + req.query.presentationId);
  
    var presentationId = req.query.presentationId;
  
    var listaEventos = sto.head(presentationId, presentationEvent);
    if (listaEventos == undefined) {
      listaEventos = [];
    }

    console.log("___listaEventos___" + listaEventos.length);

    sto.commit(presentationId, [], presentationEvent);  
    
    res.send(listaEventos);
});

app.get("/presentation/:presentationName", function(req, res) {

  console.log("___ENTER GET REDIRECT___");

  var instprocess = req.query.instprocess;
  var dateref = req.query.dateref;
  var scenario = req.query.cenario;

  var presentationName = req.params.presentationName;

  var presentation = coreRepository.getPresentation(presentationName);

  var urlPath = presentation.urlPath;

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
    urlPath += "?" + queryStringArr.join('&');
  }

  res.redirect(urlPath);
});


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});