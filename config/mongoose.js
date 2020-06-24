


//require the fies
const mongoose = require('mongoose');



//telling mongoose to connect to the local host file 
mongoose.connect('mongodb://localhost/contactList_db');



//the connection made are then put in a variable db
const db=mongoose.connection;



//if there is error bind the console woth the error and display the error
db.on('error',console.error.bind(console,'error connecting to db'));



//if it sucessfully works print this mgs 
db.once('open',function(){

    console.log('sucessfully connected to db');

});
