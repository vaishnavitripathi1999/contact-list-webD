
//getting the express
const express= require('express');

//importing th emongoose file
const db =require('./config/mongoose');

//importing the contact schema file 
const contact= require('./model/contact');



//getting all the funcanality in app
const app =express();


const path = require('path');
const { equal } = require('assert');


//setting the views templete 
app.set('view engine','ejs');


//setting the templete engine
app.set('views',path.join(__dirname,'views'))


//setting the middleware
app.use(express.urlencoded());


//for loading the style we are creating the middle ware
app.use(express.static('assets'));


//setting up practice middle ware
// app.use(function(req,res,next){

// req.myName='vaishnavi'
// console.log('middleware 1');
// next();

// });

// app.use(function(req,res,next){

//     console.log(req.myName);
//     console.log('middleware 2');
//     next();
// })

//defining the port 
const port = 8000;


var contactList=[
    {
        name:'vaishnavi',
        number:'12345'
    },
    {
        name:'khushi',
        number:'1235678'
    },
    {
        name:'mastani',
        number:'12356789'
    },
]


//telling the app
app.get('/',function(req,res){

    // res.send('<h1>The site is working</h1>');


   contact.find({},function(err,contact){
    if(err){

        console.log('there is an error in finding the data in the db');
        return;
         }

         return res.render('home',{title:'my contact list',
         cont_List:contact});


   });

    
});


app.post('/contat_list_form',function(req,res){

//    return res.redirect('/practice');
        // console.log(req.body);
        // console.log(req.body.name);
        // console.log(req.body.number);

        // contactList.push({

        //     name:req.body.name,
        //     number:req.body.number

        // });


        contact.create({

            name:req.body.name,
            number:req.body.number

        },function(err,newContact){

            if(err){
                return console.log('error in creating a contact ');
            }

           console.log('*********',newContact);
           return res.redirect('back');


        });

        // return res.redirect('back')

});


//creating a route for practice 
app.get('/practice',function(req,res){


    //  console.log(req);
    return res.render('practice',{title:'practice'})

});


//deleting the contact 
app.get('/delete-contact/' ,function(req,res){


    console.log(req.query);

    //getting the id from the database 
let id=req.query.id;

//finding the contact through id and then deleting the number

contact.findByIdAndDelete(id,function(err){


    if(err){
        return console.log('error in deleting the contact');
    }


    return res.redirect('back');
});


// let contactIndex= contactList.findIndex(contact=>contact.number== phone);



// if(contactIndex != -1){

// contactList.splice(contactIndex,1);
 


// }


// return res.redirect('back');



});


//ther server will listen on the port and function accordingly 
app.listen(8000,function(err){
if(err){


console.log('error in connecting to the server',err);


return;


} 

console.log('the server is running on the port',port);

});
