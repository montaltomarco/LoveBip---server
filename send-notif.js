var apn = require('apn');

var options = { cert : 'ios/cert_dev.pem', key: 'ios/key_dev.pem' };
var apnConnection = new apn.Connection(options);
var marcoDevice = new apn.Device("16b2553799fff76a8c288d2f90851021bb921d32d85851fbef94b29622d9f81d");//fe36f3fbb4130c9609c9abf2f78ac67057461f5fba7efb67fffedacf2bfe66e9");

var noteforMarco = new apn.Notification();

noteforMarco.alert = "Hello Marco ! Ludmila thinks about you!";
noteforMarco.contentAvailable = 1

apnConnection.pushNotification(noteforMarco, marcoDevice);

apnConnection.on('completed', function() {
        console.log("notif send");
        apnConnection.shutdown();
        setTimeout(function() {
          process.exit(0);
        }, 2000 );
        return;
});
