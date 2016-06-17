var apn = require('apn');

var options = { cert : '../lovebip_certs/cert_dev.pem', key: '../lovebip_certs/key_dev.pem' };
var apnConnection = new apn.Connection(options);
var marcoDevice = new apn.Device("b50e7f19d07999b18e75e94bf270eb241c9e1e663bf07ec4fe4964f23ca9fd56");//fe36f3fbb4130c9609c9abf2f78ac67057461f5fba7efb67fffedacf2bfe66e9");

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
