// Requiring express in our server
const express = require('express');
const app = express();
  

// Defining get request at '/' route
app.get('/', function(req, res) {
  res.json({
    error: "You are at the wrong place"
  });
});
  

let driver_longitude = 34.3920304394;
let driver_latitude = 33.3378394730;
// Defining get request at '/multiple' route
app.get('/dateinfo', function(req, res) {
    let date_obj = new Date();
  res.json({
    driver_latitude: driver_latitude
  });
});

app.post('/', function(request, response) {
    console.log('POST /')
    console.dir(request.body)
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end('thanks')
  })
// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
    console.log("Server is running at port 3000");
  });