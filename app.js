const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const appConfig = require('./config/appConfig');
const mongoose = require('mongoose');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
  });

  const modelsPath = './models';
  const routesPath = './routes'

  fs.readdirSync(modelsPath).forEach(function(file){
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)
  })

  fs.readdirSync(routesPath).forEach(function(file){
    if (~file.indexOf('.js')) {
        require(routesPath + '/' + file).setRoutes(app);
    }
  })


const server = http.createServer(app);
// start listening to http server
console.log(appConfig);
server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
    if (error.syscall !== 'listen') {
      console.log(error.code + 'error on server')
      throw error;
    }
}


function onListening() {

    var addr = server.address();
    
    console.log('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
    let db = mongoose.connect(appConfig.db.uri, {
      //useMongoClient: true
    });
  }


  mongoose.connection.on('error', function(err) {
    console.log('database connection error');
    console.log(err)
  
  }); // end mongoose connection error
  
  mongoose.connection.on('open', function(err) {
    if (err) {
      console.log("database error");
      console.log(err);
    } else {
      console.log("database connection open success");
  
    }
  });
  


module.exports = app;