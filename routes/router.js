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
    res.render('./admin/registration',{
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



router.get('/uniposts',UniversityController.getUniversityAllPostAPI);

router.get('/postcount',UniversityController.getUniversityPostCountAPI);





router.post('/upost',UniversityController.sendDataAPI);
router.get('/uc_post',UniversityController.getDataAPI);
router.get('/updateinfo/:id',UniversityController.getOneDataAPI);
router.post('/updateupost/:id',UniversityController.updateDataAPI);
router.get('/unipostdel/:id',UniversityController.deleteDataAPI);


//Send pending Request to create universtiy control panel account
router.post('/unireg',UniversityController.sendUniversityDataAPI);


//For Admin Show University Requests List 
router.get('/unilist',UniversityController.getUniversityReqDataAPI);
//For Admin Show Approved University List
router.get('/uniaplist',UniversityController.getUniversityDataAPI);
//For approve university panel creation request
router.get('/unilists/:id/:uid',UniversityController.approveUniversityAPI);
router.get('/unilistdel/:id',UniversityController.delUniversityReqAPI); 


//Full Admission Post Controlling Section

router.get('/createunipost/:u_id',UniversityController.sendFullAdmissionPostAPI);




//User Routing Section
router.post('/send',UserController.SendUserDataAPI);
router.get('/userlist',UserController.getAllUserDataAPI);
router.get('/deluser/:id',UserController.deleteUserAPI);





module.exports = router;