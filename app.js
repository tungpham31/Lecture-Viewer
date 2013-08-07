'use strict';

/**
 * Module dependencies.
 */

//This is a very basic node server meant to server index.html and resources and little else

var express = require('express');
var http    = require('http');
var https   = require('https');
var path    = require('path');
var CONFIG  = require('config');
var fs      = require('fs');

// Read in SSL certificates:
var privateKey  = fs.readFileSync(CONFIG.SSL.root + '/ssl.key');
var certificate = fs.readFileSync(CONFIG.SSL.root + '/ssl.crt');
var SSLOptions  = {
  key  : privateKey,
  cert : certificate
};

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.engine('html', require('ejs').renderFile);

app.configure('development', function(){
  // Configuration for development environments.
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use('/app', express.static(__dirname + '/app'));
  app.use(express.static(path.join(__dirname, '/app')));
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions : true,
                                 showStack: true }));
});

app.configure('production', function(){
  // Configuration for production environments.
  var RedisStore = require('connect-redis')(express);
  var sessionStore = new RedisStore();
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({
    secret: 'LectureViewer',
    store : sessionStore,
    key   : 'lectureview.sid'
  }));
  app.use(app.router);
  app.use('/app', express.static(__dirname + '/app'));
  app.use(express.static(path.join(__dirname, '/app')));
  app.use(express.logger('default'));
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index.html', { title: 'Express' });
});

// API
var api = require('./server/routes/api');
app.get('/api/media/semesters', api.media.query);
app.get('/api/media/:semester', api.media.query);
app.get('/api/media/:semester/:course', api.media.query);
app.get('/api/media/:semester/:course/:lecture', api.media.query);

// API For PAOL Processing
app.get('/api/config', api.config);

https.createServer(SSLOptions, app).listen(app.get('port'));

// configure this to redirect http requests to https. Two ways:
//  1. do it in node and redirect to https URL
//  2. use IP tables (probably better)
//
// http.createServer(app).listen(app.get('port'));
