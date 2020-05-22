var http = require("http");
var express = require("express");
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var cookieParser = require('cookie-parser')
app.set("view engine", "vash");//ejs view engine
var controllers = require("./controllers");
app.use(express.urlencoded());
app.use(express.json());

var flash = require("connect-flash");
var session = require('express-session')

app.use(cookieParser());
app.use(session({
    secret: 'diegonudler',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  
  app.use(flash());
controllers.init(app);

app.use(express.static(__dirname + "/public"));




var server = http.createServer(app);
server.listen(1337);
