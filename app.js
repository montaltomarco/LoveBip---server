var app = require('express')();
var apn = require('apn');
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var marcoToken = "fe36f3fbb4130c9609c9abf2f78ac67057461f5fba7efb67fffedacf2bfe66e9"
var liudaToken = "16b2553799fff76a8c288d2f90851021bb921d32d85851fbef94b29622d9f81d"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var options = { cert : 'ios/cert_dev.pem', key: 'ios/key_dev.pem'};


http.listen(80, function(){
  console.log('-----Listening on : 80');
});

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/getBirdsRealTime', function(req, res){
  var jsonObject = {};
  for(var i=0; i<getRandomArbitrary(1,15); i++){
    var jsonPoints = {};
    jsonPoints.x = getRandomArbitrary(30,70);
    jsonPoints.y = getRandomArbitrary(-10,60);
    jsonObject['point'+i] = jsonPoints;
  }
  res.jsonp(jsonObject);
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var apnConnection = new apn.Connection(options);
var marcoDevice = new apn.Device(marcoToken);
var liudaDevice = new apn.Device(liudaToken);

var noteforMarco = new apn.Notification();
var noteforLudmila = new apn.Notification();

noteforMarco.alert = "Hello Marco ! Ludmila thinks about you!";
noteforMarco.contentAvailable = 1
noteforLudmila.alert = "Hello Ludmila ! Marco thinks about you!";
noteforLudmila.contentAvailable = 1

app.post('/api/sendemotion', function(req, res) {
    console.log(req.body);
    if (req.body.iosdeviceid == marcoToken) {
        apnConnection.pushNotification(noteforLudmila, liudaDevice);
        res.send('Success');
    } else{
        apnConnection.pushNotification(noteforMarco, marcoDevice);
        res.send('Success');
    }
});

apnConnection.on('socketError', function (error) {
    console.log("------SOCKET ERROR. Socket ERROR happened :" + error);
    return;
});

apnConnection.on('error', function (error) {
    console.log("------ERROR. Error with initialisation : " + error);
    return;
});

apnConnection.on('transmitted', function (notification, device) {
    console.log("-------TRANSMITTED. Notification transmitted : " + notification.alert + " to device " + device);
    return;
});

apnConnection.on('completed', function() {
    console.log("-------COMPLETED. All the pending notification have been sent!\n\n");
    return;
});

apnConnection.on('sizeDifference', function(sizeDifference) {
    console.log("-------SIZE DIFFERENCE. Some notification has been lost. Size : " + sizeDifference);
    return;
});

apnConnection.on('connected', function(openSockets) {
    console.log("\n\n-------CONNECTED. Connection to Apple OK. Number of open sockets : " + openSockets);
    return;
});

apnConnection.on('disconnected', function(openSockets) {
    console.log("-------DISCONNECTED. Disconnection to Apple. Number of closed sockets : " + openSockets);
    return;
});

apnConnection.on('timeout', function() {
    console.log("-------TIMEOUT. Socket closed because of timeout. Disconnected will be called.");
    return;
});

apnConnection.on('transmissionError', function(errorCode, notification, device) {
    console.log("-------TRANSMISSION ERROR. Could not transmit notification : " + notification + " on device " + device + ". ERROR : " + errorCode);
    return;
});