const express = require('express');
const myRouter = require('./routes/router');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 5500;

mongoose.connect('mongodb://localhost:27017/brac', {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', ()=> {
    console.log("Database connection failed");
});
db.once('open', ()=>{
    console.log("Database connection established.");
})

app.set("view engine", "ejs");

app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', myRouter);
app.use('/registration', myRouter);
app.use('/adminlogin', myRouter);
app.use('/userlogin', myRouter);
app.use('/userinfo', myRouter);

app.listen(port,(err)=> {
    if(!err){
        console.log(`Server run on port ${port}`);
    }
    else{
        console("Error! Server down.");
    }
})