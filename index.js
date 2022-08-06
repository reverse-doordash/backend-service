// Requiring express in our server
const express = require('express');
const app = express();
  
require('dotenv').config();


// Defining get request at '/' route
app.get('/', function(req, res) {
  res.json({
    error: "You are at the wrong place"
  });
});
  
//setting temporary placeholder values
var driver_longitude = 34.000000000000;
var driver_latitude = 34.000000000000;
var client_longitude = 34.000000000000;
var client_latitude = 34.000000000000;

//to get a json with locations use
app.get('/getlocs', function(req, res) {
    let date_obj = new Date();
  res.json({
    driver_latitude: driver_latitude,
    driver_longitude: driver_longitude,
    client_latitude: client_latitude,
    client_longitude: client_longitude
  });
});

app.post('/driverlocupdate', function(request, response) {
    console.log('POST /')
    if (request.headers.passwd == process.env.SECURE_HEADER_PASSCODE){
        driver_latitude = request.headers.driver_latitude;
        driver_longitude = request.headers.driver_longitude;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('thanks, received')
    }else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('unable to update, check passcode')
    }
    
    
  })

  app.post('/clientlocupdate', function(request, response) {
    console.log('POST /')
    if (request.headers.passwd == process.env.SECURE_HEADER_PASSCODE){
        client_latitude = request.headers.client_latitude;
        client_longitude = request.headers.client_longitude;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('thanks, received')
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('unable to update, check passcode')
    }
    console.log(request);
    
    
  })
  
// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
    console.log("Server is running at port 3000");
  });