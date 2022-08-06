// Requiring express in our server
const { json } = require('body-parser');
const express = require('express');
var cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());
app.use(json());

// Defining get request at '/' route
app.get('/', function (req, res) {
  res.json({
    error: 'You are at the wrong place',
  });
});

//setting temporary placeholder values
var driver_longitude = 34.0;
var driver_latitude = 34.0;
var client_longitude = 34.0;
var client_latitude = 34.0;
let message = "LIVE NOW";
let discoMode = false;

function generateRandCoords(){
    let randDigits = parseInt(Math.random() * Math.pow(10, 11));
    console.log(randDigits);
}

//to get a json with locations use
app.get('/getlocs', function (req, res) {
  let date_obj = new Date();
  res.json({
    driver_latitude: driver_latitude,
    driver_longitude: driver_longitude,
    client_latitude: client_latitude,
    client_longitude: client_longitude,
  });
});

app.post('/driverlocupdate', function (request, response) {
  console.log('POST /');
  if (request.headers.passwd == process.env.SECURE_HEADER_PASSCODE) {
    driver_latitude = request.body.driver_latitude;
    driver_longitude = request.body.driver_longitude;
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('thanks, received');
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('unable to update, check passcode');
  }
});

app.post('/clientlocupdate', function (request, response) {
  console.log('POST /');

  if (request.headers.passwd == process.env.SECURE_HEADER_PASSCODE) {
    client_latitude = request.body.client_latitude;
    client_longitude = request.body.client_longitude;
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('thanks, received');
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('unable to update, check passcode');
  }
});

  app.post('/clientlocupdate', function(request, response) {
    console.log('POST /')
    
    if (request.headers.passwd == process.env.SECURE_HEADER_PASSCODE){
        client_latitude = request.body.client_latitude;
        client_longitude = request.body.client_longitude;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('thanks, received')
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('unable to update, check passcode')
    }
    
    
    
  })

  app.post('/discoMode', function(request, response) {
    console.log('POST /')
    
    if (request.query.discoMode == "false"){
        discoMode = false;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('thanks, received')
        console.log("Disco mode disabled");
    } else if (request.query.discoMode == "true"){
        discoMode = true;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('thanks, received')
        console.log("Disco mode enabled");
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('unable to update, check passcode')
    }
    
    
    
  })

  app.post('/finished', function(request, response) {
    console.log('POST /')
    if (request.query.finishRide == "true"){
        message = "RIDE ENDED";
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('thanks, received');
        console.log("ride has been finished");
    } else if (request.query.finishRide == "false"){
        message = "LIVE NOW";
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('thanks, received');
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('unable to update, check passcode');
    }
    
  })

  app.get('/getmessage', function (req, res) {
    let date_obj = new Date();
    res.json({
      msg: message
    });
  });

  generateRandCoords();
  
// Setting the server to listen at port 3000
app.listen(3000, function (req, res) {
  console.log('Server is running at port 3000');
});
