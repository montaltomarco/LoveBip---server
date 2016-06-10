var mysql      = require('mysql');
var connection = mysql.createConnection('mysql://guillaume:guillaume@127.0.0.1:3306/test?debug=true');

// don't need .connect()
connection.query('CREATE TABLE User (ID int, FBUser_ID bigint,' +
                 'First_name VARCHAR(100), LastName VARCHAR(100),' +
                 'Email VARCHAR(100), PIC_URL VARCHAR(100)' + 
                 'PRIMARY KEY(Stop_id))',
function(err, result){
    // Case there is an error during the creation
    if(err) {
        console.log(err);
    } else {
        console.log("Table Ter_Stops Created");
    }
});
