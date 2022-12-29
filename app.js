const express = require('express');
const myRouter = require('./routes/router');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 4500;
require('./src/db/conn');




app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());

app.use('/',require('./routes/router'));


// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());


app.listen(port,(err)=> {
    if(!err){
        console.log(`Server is running on port ${port}`);
    }
    else{
        console("Error! Server down.");
    }
});