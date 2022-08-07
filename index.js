// Requiring express in our server
const { json } = require('body-parser');
const express = require('express');
var cors = require('cors');

const { exec } = require("child_process");
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
var driver_longitude = 37.78680489952002;
var driver_latitude = -122.4049480163113;
var client_longitude = 37.78662352047515;
var client_latitude = -122.40631596968298;

let message = "LIVE NOW";
let discoMode = false;
let inkSplat = false;
let increment = 0;

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function generateRandLatCoord(){
    driver_latitude = getRandomInRange(-122.40631596968298, -122.4049480163113, 17);
    return driver_latitude;
}


function generateRandLonCoord(){
  driver_longitude = getRandomInRange(37.78577964868966, 37.78680489952002, 17);
    return driver_longitude;
  }


//to get a json with locations use
app.get('/getlocs', function (req, res) {
  let date_obj = new Date();

  if (discoMode){
    console.log("Disco mode is on!!!")
    res.json({
      driver_latitude: generateRandLatCoord(),
      driver_longitude: generateRandLonCoord(),
      client_latitude: client_latitude,
      client_longitude: client_longitude,
    });
  } else {
    res.json({
      driver_latitude: driver_latitude,
      driver_longitude: driver_longitude,
      client_latitude: client_latitude,
      client_longitude: client_longitude,
    });
  }
  
});

app.post('/driverlocupdate', function (request, response) {
  console.log('POST /');
  if (request.headers.passwd == process.env.SECURE_HEADER_PASSCODE) {
    if (discoMode == false){
      driver_latitude = request.body.driver_latitude;
      driver_longitude = request.body.driver_longitude;
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('thanks, received driver position');
      console.log("Updating driver position");
    }
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('unable to update driver, check passcode');
    console.log("unable to update driver response")
  }
});

app.post('/clientlocupdate', function (request, response) {
  console.log('POST /');

  if (request.headers.passwd == process.env.SECURE_HEADER_PASSCODE) {
    client_latitude = request.body.client_latitude;
    client_longitude = request.body.client_longitude;
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('thanks, received client position');
    console.log("Updating client position");
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('unable to update client, check passcode');
    console.log("Unable to update client")
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

  app.post('/modeselection', function(request, response) {
    console.log('POST /')
    
    if (request.query.discoMode == "false"){
        discoMode = false;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('thanks, received')
        console.log("Disco mode disabled");
    } else if (request.query.discoMode == "true"){
        discoMode = true;
        inkSplat = false;
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('thanks, received')
        console.log("Disco mode enabled");
        setTimeout(() => {
          discoMode= false;
        }, "2500")
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end('unable to update, check passcode')
    }

    if (request.query.inkSplat == "false"){
        inkSplat = false;
        console.log("Ink Splat Disabled");
    } else if (request.query.inkSplat == "true"){
        inkSplat = true;
        discoMode = false;
        console.log("Ink Splat enabled");
    } 
  })

  app.get('/getModesEnabled', function (req, res) {
    let date_obj = new Date();
    res.json({
      discoMode_1 : discoMode,
      inkSplat_1 : inkSplat
    });
  });


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

  app.get('/pullFront', function (req, res) {
    if (req.query.passwd == process.env.SECURE_HEADER_PASSCODE){
      exec("cd /var/www/web && git pull && sudo systemctl stop run_vite && sudo systemctl start run_vite");
      res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('thanks, received');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('not pulled');
    }
    
  });

  app.get('/getmessage', function (req, res) {
    let date_obj = new Date();
    res.json({
      msg: message
    });
  });

  app.get('/getincrement', function (req, res) {
    res.json({
      incre: increment
    });
  });

  app.post('/updateincrement', function(request, response) {
    console.log('POST /updateincrement');
    increment += request.query.increment;
    response.end('thanks, received');
    console.log("increment has been updated"); 
  })

  app.post('/refresh', function(request, response) {
    console.log('POST /refresh');
    driver_longitude = 37.78680489952002;
    driver_latitude = -122.4049480163113;
    client_longitude = 37.78662352047515;
    client_latitude = -122.406315969682
    message = "LIVE NOW";
    discoMode = false;
    inkSplat = false;
    increment = 0;

    response.end('thanks, received');
    console.log("environment has been refreshed"); 
  })


// Setting the server to listen at port 3000
app.listen(3000, function (req, res) {
  console.log('Server is running at port 3000');
});
