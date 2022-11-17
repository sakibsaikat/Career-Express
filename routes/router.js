const express = require('express');
const router = express.Router();
const Admission = require('./../src/model/admissionpostModel');
let areas = require('./../src/model/try.js');
let UserController = require('./../src/controller/userController');
let AdmissionController = require('./../src/controller/admissionController');
let TrainingController = require('./../src/controller/trainingController');

router.get('/', AdmissionController.GetUserPostAPI);

router.get('/registration', (req, res)=> {
    res.render('registration',{
        areas:areas
    }
    );
});

router.get('/adminlogin', (req, res)=> {
    res.render('adminlogin');
});

router.get('/userlogin', (req, res)=> {
    res.render('userlogin');
});

router.get('/tdash', (req, res)=> {
    res.render('dashTraining');
});
router.get('/cdash', (req, res)=> {
    res.render('dashc');
});







router.post('/send',UserController.SendUserDataAPI);

router.post('/sendadpost',AdmissionController.SendUserDataAPI);
router.get('/admission',AdmissionController.GetUserDataAPI);
router.get('/admission_info/:id',AdmissionController.GetInfoAPI);
router.post('/update_admission/:id',AdmissionController.UpdateUserDataAPI);

router.get('/training',TrainingController.GetUserDataAPI);



router.get('/admissionc',AdmissionController.GetCUserDataAPI);

router.get('/trainingc',TrainingController.GetCUserDataAPI);


module.exports = router;