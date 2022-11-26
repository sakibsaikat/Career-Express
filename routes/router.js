const express = require('express');
const router = express.Router();
const Admission = require('./../src/model/admissionpostModel');
let areas = require('./../src/model/try.js');
let UserController = require('./../src/controller/userController');
let AdmissionController = require('./../src/controller/admissionController');
let UniversityController = require('./../src/controller/universityController');



router.get('/',(req,res)=>{
    res.render('index');
})


router.get('/registration', (req, res)=> {
    res.render('registration',{
        areas:areas
    }
    );
});
router.get('/unireg',(req,res)=>{
    res.render('./university/universityreg',{
        areas:areas
    });
});

router.get('/adminlogin', (req, res)=> {
    res.render('./admin/adminlogin');
});

router.get('/userlogin', (req, res)=> {
    res.render('./admin/userlogin');
});


router.get('/cdash', (req, res)=> {
    res.render('./admin/dashc');
});

router.get('/udash',(req,res)=>{
    res.render('./university/universitydasboard');
});




router.post('/upost',UniversityController.sendDataAPI);
router.get('/uc_post',UniversityController.getDataAPI);
router.get('/unipostdel/:id',UniversityController.deleteDataAPI);







// router.post('/send',UserController.SendUserDataAPI);
// router.post('/sendadpost',AdmissionController.SendUserDataAPI);
// router.get('/admission',AdmissionController.GetUserDataAPI);
// router.get('/admission_info/:id',AdmissionController.GetInfoAPI);
// router.post('/update_admission/:id',AdmissionController.UpdateUserDataAPI);




router.get('/admissionc',AdmissionController.GetCUserDataAPI);



module.exports = router;