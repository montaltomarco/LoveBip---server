var app = require('express')();
var apn = require('apn');
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var model = require('./lib/models');
let db = require('./lib/conn/db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var options = { cert : 'APNS/cert_dev_bip.pem', key: 'APNS/key_dev_bip.pem'};

model.User.sync({force: false}).then(function() {
  model.Security.sync({force: false}).then(function() {
    db.db_inst.sync({force: false}).then(function() {
      console.log("\n\n -----------------Database is created \n\n");
      http.listen(80, function(){
        console.log('-----Listening on : 3000');
      });
    });
  });
});

var marcoToken = "fe36f3fbb4130c9609c9abf2f78ac67057461f5fba7efb67fffedacf2bfe66e9"
var liudaToken = "16b2553799fff76a8c288d2f90851021bb921d32d85851fbef94b29622d9f81d"

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

app.post('/v1.0/login/loginWithFacebook', function(req, res) {
    console.log(req.body);
    model.User.findOrCreate({where:
      {email: req.body.email},
      defaults: {
        fbUserID: req.body.FBId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        pic_url: req.body.pic_url
      }}).spread(function(user, created) {
        console.log(user.get({
          plain: true
        }))
        console.log(created);
      });
      res.json({"message": "Login With Facebook OK"});
});

app.post('/v1.0/notifications/registerAPNS', function(req, res) {
    console.log(req.body);
    model.User.update(
      {
        device_token: req.body.iosDeviceId
      },
      {where: {email: req.header('email')} }
    ).then(
      console.log("UPDATED")
    )
});

app.post('/v1.0/pair/registerPair', function(req, res) {
    console.log(req.body);
    var uid1;
    var uid2;
    model.User.findOne({where:
      {email: req.header('email')} }
      ).then(function(user) {
        if(user) {
          uid1 = user.id;
          console.log("ID 1 is : %s", uid1)
          model.User.findOne({where:
            {email: req.body.emailPair} }
            ).then(function(user) {
                if(user) {
                  uid2 = user.id;
                  console.log("ID 2 is : %s", uid2)
                  model.Pair.findOrCreate({where:
                    {user_id1: uid1},
                    defaults: {
                      user_id1: uid1,
                      user_id2: uid2
                    }}).spread(function(pair, created) {
                      console.log(pair.get({
                        plain: true
                      }))
                      console.log(created);
                    });
                    model.Pair.findOrCreate({where:
                      {user_id1: uid1},
                      defaults: {
                        user_id1: uid2,
                        user_id2: uid1
                      }}).spread(function(pair, created) {
                        console.log(pair.get({
                          plain: true
                        }))
                        console.log(created);
                      });
                      res.json({"message": "Paired: OK"});
                      return;
                  } else {
                    res.json({"message": "Paired: KO"});
                    return;
                  }
              });
        } else {
          res.json({"message": "Paired: KO"});
          return;
        }
      });
});
