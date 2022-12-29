const express = require('express');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Admission = require('./../src/model/admissionpostModel');
const UnipostModel = require('./../src/model/unipostModel');
const waiversModel = require('./../src/model/waiverpostmodel');
const waiverModel = require('./../src/model/waiverModel');
let areas = require('./../src/model/try.js');
let UserController = require('./../src/controller/userController');
let AdmissionController = require('./../src/controller/admissionController');
let UniversityController = require('./../src/controller/universityController');
let uploadController = require('./../src/controller/uploadController');
let universityModel = require('./../src/model/universityModel');
let admin = require('./../src/model/mAdmin');



//Upload Image Section
const destination_folder = path.join('./public/adminpic');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,destination_folder);
    },
    filename:async (req,file,cb)=>{
        let myfilename = req.session.admin_id+path.extname(file.originalname);
        let imgdata = await admin.findOneAndUpdate({admin_id:req.session.admin_id},{image:myfilename});
        cb(null,myfilename);
    }
});

const uploadAdmin = multer({storage:storage});

//for university upload

const destination_folder_uni = path.join('./public/unipic');

const storage_uni = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,destination_folder_uni);
    },
    filename:async (req,file,cb)=>{
        let myfilename = req.session.university_id+path.extname(file.originalname);
        let imgdata = await universityModel.findOneAndUpdate({university_id:req.session.university_id},{image:myfilename});
        cb(null,myfilename);
    }
});

const uploadUniversity = multer({storage:storage_uni});






router.use(session({
    secret:"ThisIsARandomSecret",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:100*60*60*24
    }
}));


let redirectToUnilogin = (req,res,next)=>{
    if(!req.session.university_id){
        res.redirect('/unilogin');
    }
    else{
        next();
    }
}
let redirectToUniDash = (req,res,next)=>{
    if(req.session.university_id){
        res.redirect(`/udash`);
    }
    else{
        next();
    }
}


let redirectToAdminDash = (req,res,next)=>{
    if(req.session.admin_id){
        res.redirect('/cdash');
    }else{
        next();
    }
}

let redirectToAdminLogin = (req,res,next)=>{
    if(!req.session.admin_id){
        res.redirect('/adminlogin');
    }else{
        next();
    }
}


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


router.get('/userlogin', (req, res)=> {
    res.render('./admin/userlogin');
});


// router.get('/cdash', (req, res)=> {
//     res.render('./admin/dashc');
// });

router.get('/cdash',redirectToAdminLogin,async (req,res)=>{
    if(req.session.admin_id){
        let data = await admin.find({admin_id :req.session.admin_id});
        res.render('./admin/dashc',{
            adata:data
        });
    }
    
});

router.get('/udash',redirectToUnilogin,async (req,res)=>{
    if(req.session.university_id){
        let data = await universityModel.find({university_id :req.session.university_id});
        res.render('./university/universitydasboard',{
            data:data
        });
    }
});



router.get('/uniposts',UniversityController.getUniversityAllPostAPI);

router.get('/postcount',UniversityController.getUniversityPostCountAPI);





router.post('/upost',UniversityController.sendDataAPI);
router.get('/uc_post',UniversityController.getDataAPI);
router.get('/updateinfo/:id',UniversityController.getOneDataAPI);
router.post('/updateupost/:id',UniversityController.updateDataAPI);
router.get('/unipostdel/:id',UniversityController.deleteDataAPI);
router.post('/checkunilogin',UniversityController.checklogin);


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
router.get('/createunipost',(req,res)=>{
    res.redirect(`/createunipost/${req.session.university_id}`);
});
router.get('/createunipost/:u_id',UniversityController.sendFullAdmissionPostAPI);

// Full Waiver Post Controlling Section

router.get('/createwaiverpost',UniversityController.sendFullWaiverPostAPI);




//User Routing Section
router.post('/send',UserController.SendUserDataAPI);
router.get('/userlist',UserController.getAllUserDataAPI);
router.get('/deluser/:id',UserController.deleteUserAPI);



//Waiver Routing Section
router.post('/uwaiver_post',UniversityController.sendWaiverAPI);
router.get('/waiver_post',UniversityController.getWaiverAPI);
router.get('/updatewaiverpost/:id',UniversityController.getOneWaiverDataAPI);
router.post('/updatewaiverpost/:id',UniversityController.updateWaiverAPI);
router.get('/uniwaiverdel/:id',UniversityController.deleteWaiverAPI);

router.get('/waiver_count', UniversityController.getUniversityWaiverPostCountAPI);










router.get('/unilogin',redirectToUniDash,(req,res)=>{
    res.render('university/unilogin');
});



router.get('/unilogout',(req,res)=>{

    console.log(req.session.university_id);
    if(req.session.university_id){
        req.session.destroy();
    }
    res.redirect('unilogin');
});


router.post('/mAdminlogin',UniversityController.checkadminlogin);

router.get('/adminlogin',redirectToAdminDash,(req, res)=> {
    res.render('./admin/adminlogin');
});

router.get('/adminlogout',(req,res)=>{
    if(req.session.admin_id){
        req.session.destroy();
    }
    res.redirect('/adminlogin');
});




router.get('/uniprofile',async (req,res)=>{

    let unidata = await universityModel.find({university_id:req.session.university_id});
    res.render('./university/uniprofile',{
        unidata:unidata
    });
});


router.post('/uplaodunimg',uploadUniversity.single('profile_pic'),(req,res)=>{
    res.redirect('/uniprofile');
});




router.get('/adminprofile',async (req,res)=>{

    let admindata = await admin.find({admin_id:req.session.admin_id});
    res.render('./admin/adminprofile',{
        admindata:admindata
    });
});

router.post('/uplaodimg',uploadAdmin.single('profile_pic'),(req,res)=>{
    res.redirect('/adminprofile');
});







//University post and waiver view
router.get('/universityposts',async (req,res)=>{
    const unidata = await universityModel.find({university_id:req.session.university_id});

    const post_id_data = await Admission.find({university_id:req.session.university_id});

    let post_ids = [];
    let i=0;
    post_id_data.forEach(function(val){
        post_ids[i]={
            post_id:val.post_id
        }
        i++;
    });


    let post_data = [];

    for(let x=0;x<post_ids.length;x++){
        post_data[x] = await UnipostModel.find(post_ids[x]);
    } 

    post_data[0].forEach(function(val){
        console.log(val);
    });
   

    res.render('./university/uniposts',{
        data:unidata,
        postdata:post_data 
    });
});



router.get('/waivers',async (req,res)=>{
    const unidata = await universityModel.find({university_id:req.session.university_id});

    const waiver_id_data = await waiversModel.find({university_id:req.session.university_id});

    let wav_ids = [];
    let i=0;
    waiver_id_data.forEach(function(val){
        wav_ids[i]={
            waiver_post_id:val.waiver_post_id
        }
        i++;
    });


    wav_post_data = [];

    for(let x=0;x<wav_ids.length;x++){
        wav_post_data[x] = await waiverModel.find(wav_ids[x]);
    } 

    wav_post_data[0].forEach(function(val){
        console.log(val);
    });
   

    res.render('./university/waivers',{
        data:unidata,
        wavdata:wav_post_data 
    });
});





module.exports = router;