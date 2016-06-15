var apn = require('apn');

var options = { cert : '../lovebip_certs/cert_dev.pem', key: '../lovebip_certs/key_dev.pem' };
var apnConnection = new apn.Connection(options);
var marcoDevice = new apn.Device("1ef73701615e2fdc36260eb4bf99054813e1a8f377e6368a7f23666f868b5188");//fe36f3fbb4130c9609c9abf2f78ac67057461f5fba7efb67fffedacf2bfe66e9");

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
