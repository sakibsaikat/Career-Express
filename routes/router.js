const express = require('express');
const router = express.Router();
const dbmodel = require('../model/dbmodel');

router.get('/', (req, res)=> {
    res.render('index');
});

router.get('/registration', (req, res)=> {
    res.render('registration');
});

router.get('/adminlogin', (req, res)=> {
    res.render('adminlogin');
});

router.get('/userlogin', (req, res)=> {
    res.render('userlogin');
});

router.get('/userinfo', (req, res)=> {
    dbmodel.find((err, docs)=> {
        if(!err){
            res.render('userinfo', {bracs:docs});
        }
        else{
            console.log("Error 404");
        }
    });
});

router.get('/update/:id', (req, res)=> {
    dbmodel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, docs)=> {
        if(err){
            console.log("Update operation failed");
        }
        else{
            res.render('update', {brac: docs});
        }
    });
});



router.post('/send', (req, res)=> {
    const {fullname, email, password, mobile, dateofbirth, gender, location, file} = req.body;
   // console.log(fullname, email, password, mobile, dateofbirth, gender, location, file);
   const bracUser = new dbmodel({
    fullname,
    email, 
    password, 
    mobile, 
    dateofbirth, 
    gender, 
    location, 
    file 
   });
   bracUser.save((err)=> {
    if(err){
        console.log("Database can't reached data");
    }else{
        console.log("Data save successfully");
        res.redirect('/');
    }
        
   });
});

router.post('/update/:id', (req, res)=> {
    dbmodel.findByIdAndUpdate({_id: req.params.id}, req.body, (err, docs)=> {
        if(err){
            console.log("Data doesn't update");
        }
        else{
            res.redirect('/userinfo');
        }
    });
});

router.get('/userinfo/:id', (req, res)=> {
    dbmodel.findByIdAndDelete({_id: req.params.id}, (err, docs)=> {
        if(err){
            console.log("Data doesn't delete");
        }
        else{
            res.redirect('/userinfo');
        }
    });
});
module.exports = router;