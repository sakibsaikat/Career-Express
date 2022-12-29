const { ObjectId } = require('mongodb');
let mongo = require('mongoose');
const session = require('express-session');
let PostModel = require('./../model/unipostModel');
let UniversityModel = require('./../model/universityModel');
let UniversityCountModel = require('./../model/count_uni_info');
let AdmissionPostModel = require('./../model/admissionpostModel');
let WaiverModel = require('./../model/waiverModel');
let WaiverCountModel = require('./../model/count_waiver_info');
let WaiverPostModel = require('./../model/waiverpostmodel');
let admin = require('./../model/mAdmin');



//Send Data to admissionposts collection
exports.sendDataAPI = async (req,res)=>{
    try{
        
        let dt = new Date();
        let d = dt.toString();
        let date = d.substring(4,15);
        let hour = parseInt(d.substring(16,18));
        let min = d.substring(19,21);
        let ap = "AM";

        if(hour>12){
            hour-=12;
            ap="PM";
        }

        let time = hour.toString()+":"+min+" "+ap;


        const {semester,department,degree,duration,shift,t_credit,pc_cost,cost} = req.body;
        const university_id = req.session.university_id;


        const countTable = UniversityCountModel.find({university_id:university_id});
        (await countTable).forEach(function(val){
            total_post = val.total_post;
            post_id = val.next_post_id;
        });


        
        const status = "NULL";

        let UniversityPost = await new PostModel({
            university_id,date,degree,time,post_id,semester,department,t_credit,pc_cost,duration,shift,cost,status
        }).save();

        res.redirect('/uc_post');
        

    }catch(err){
        console.log(err);
    }
}


//get all Data from admissionposts collection
exports.getDataAPI = async (req,res)=>{
    try{
        const unidata = await UniversityModel.find({university_id:req.session.university_id});
        const postdata = await PostModel.find({status:"NULL",university_id:req.session.university_id});
        res.render('./university/createunipost',{
            postdata:postdata,
            data:unidata
        });

    }catch(err){
        console.log(err);
    }
}

//get one Data from admissionposts collection
exports.getOneDataAPI = async (req,res)=>{
    try{
        const unidata = await UniversityModel.find({university_id:req.session.university_id});
        let postdata = await PostModel.findById(req.params.id);
        res.render('./university/upunipost',{
            postdata:postdata,
            data:unidata
        });

    }catch(err){
        console.log(err);
    }
}

//Update one Data from admissionposts collection

exports.updateDataAPI = async (req,res)=>{

    try{

        const datas = {
            semester:req.body.semester,
            department:req.body.department,
            degree:req.body.degree,
            duration:req.body.duration,
            shift:req.body.shift,
            t_credit:req.body.t_credit,
            pc_cost:req.body.pc_cost,
            cost: req.body.cost,
            status:"NULL"
        }

        let UniversityPost = await PostModel.findByIdAndUpdate(req.params.id,datas,(err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/uc_post');
            }
        });

        res.redirect('/uc_post');



    }catch(err){
        console.log(err);
    }

}




//Delete one Data from admissionposts collection
exports.deleteDataAPI = (req,res)=>{

        PostModel.findByIdAndDelete({_id:req.params.id,},(err,docs)=>{
            if(err) throw err;
            res.redirect('/uc_post');
        });
    
}




//Univrsity Regestration Information Section

exports.sendUniversityDataAPI = async (req,res)=>{
    try{
        const {name,description,username,password,ugcstatus,location} = req.body;
        const ac = req.body.name;
        let acrnym=ac[0];
        for(let x=1;x<ac.length;x++){
           if(ac[x]==" "){
            acrnym+=ac[x+1];
           }
        }
        acrnym+="36";
        const university_id = acrnym;
        const status = "pending";
        
        const university = await new UniversityModel({
            university_id,name,description,username,password,ugcstatus,location,status
        }).save();
        res.send("sent");

    }catch(err){
        console.log(err);
    }

}


//get all Data from universityList collection
exports.getUniversityDataAPI = async (req,res)=>{
    try{
        const admininfo = await admin.find({Admin_id:req.session.admin_id});
        const unidata = await UniversityModel.find({status:"approved"});
        res.render('./admin/uniapprovelist',{
            data:unidata,
            adata:admininfo
        });

    }catch(err){
        console.log(err);
    }
}
//get all Data from pending universityList collection
exports.getUniversityReqDataAPI = async (req,res)=>{
    try{
        const admininfo = await admin.find({Admin_id:req.session.admin_id});
        const unidata = await UniversityModel.find({status:"pending"});
        res.render('./admin/unilist',{
            data:unidata,
            adata:admininfo
        });

    }catch(err){
        console.log(err);
    }
}




//get count table data of university posts
exports.getUniversityPostCountAPI = async (req,res)=>{
    try{
        const admininfo = await admin.find({Admin_id:req.session.admin_id});
        const unicountdata = await UniversityCountModel.find({status:"pending"});
        res.render('./admin/postcount',{
            data:unicountdata,
            adata:admininfo
        });

    }catch(err){
        console.log(err);
    }
}


//get All pending admission post request of university
exports.getUniversityAllPostAPI = async (req,res)=>{
    try{
        const admininfo = await admin.find({Admin_id:req.session.admin_id});
        const adpostdata = await AdmissionPostModel.find({status:"pending"});
        res.render('admin/postdetails',{
            data:adpostdata,
            adata:admininfo
        });

    }catch(err){
        console.log(err);
    }
}

//Approve university panel create request
exports.approveUniversityAPI = async (req,res)=>{
    try{
        
        const university_id = req.params.uid;
        const total_post=0;
        const next_post_id=university_id+"-1";

        const total_waiver_post=0;
        const next_waiver_post_id=university_id+"W-1";


        let CountPost = await new UniversityCountModel({
            university_id,total_post,next_post_id
        }).save();

        let CountWaiverPost = await new WaiverCountModel({
            university_id,total_waiver_post,next_waiver_post_id
        }).save();

        const datas = {
            status:"approved"
        };
    

       const upuni = await UniversityModel.findByIdAndUpdate(req.params.id,datas);
       res.redirect('/unilist');

       
    }catch(err){
        console.log(err);
    }
}

//Delete University panel create request
exports.delUniversityReqAPI = (req,res)=>{
    UniversityModel.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(err) throw err;
        res.redirect('/unilist');
    });
}








//Full Admission post Controller API

exports.sendFullAdmissionPostAPI = async (req,res)=>{

    const countTable = UniversityCountModel.find({university_id:req.params.u_id});
    (await countTable).forEach(function(val){
        university_id = val.university_id;
        total_post = val.total_post;
        post_id = val.next_post_id;
    });

    let dt = new Date();
    let d = dt.toString();
    let date = d.substring(4,15);
    let hour = parseInt(d.substring(16,18));
    let min = d.substring(19,21);
    let ap = "AM";
    
    if(hour>12){
        hour-=12;
        ap="PM";
    }

    let time = hour.toString()+":"+min+" "+ap;
    

    let AdmissionPost = await new AdmissionPostModel({
        post_id,date,time,university_id,status:"pending"
    }).save();


    const admissionupdate = await PostModel.updateMany({post_id:post_id},{status:"pending"});

    let total = parseInt(total_post) + 1;
    total_post = total.toString();

    let next_post_id = university_id+"-"+(total+1).toString();

    const datas = {
        total_post:total_post,
        next_post_id:next_post_id
    }

    const countupdate = await UniversityCountModel.findOneAndUpdate({university_id:university_id},datas);
   
    res.redirect('/uc_post');


    
}
//Full Waiver post Controller API

exports.sendFullWaiverPostAPI = async (req,res)=>{

    const countTable = WaiverCountModel.find({university_id:req.session.university_id});
    (await countTable).forEach(function(val){
        university_id = val.university_id;
        total_waiver_post = val.total_waiver_post;
        waiver_post_id = val.next_waiver_post_id;
    });

    let dt = new Date();
    let d = dt.toString();
    let date = d.substring(4,15);
    let hour = parseInt(d.substring(16,18));
    let min = d.substring(19,21);
    let ap = "AM";
    
    if(hour>12){
        hour-=12;
        ap="PM";
    }

    let time = hour.toString()+":"+min+" "+ap;
    

    let WaiverPost = await new WaiverPostModel({
        waiver_post_id,date,time,university_id,status:"approved"
    }).save();


    const waiverupdate = await WaiverModel.updateMany({waiverpost_id:waiver_post_id},{status:"approved"});



    let total = parseInt(total_waiver_post) + 1;
    total_waiver_post = total.toString();

    let next_waiver_post_id = university_id+"-W"+(parseInt(total_waiver_post)+1).toString();

    const datas = {
        total_waiver_post:total_waiver_post,
        next_waiver_post_id:next_waiver_post_id
    }

    const countupdate = await WaiverCountModel.findOneAndUpdate({university_id:university_id},datas);

    
    res.redirect('/waiver_post');


    
}






//Send Waiver Data to admissionposts collection
exports.sendWaiverAPI = async (req,res)=>{
    try{
        
        let dt = new Date();
        let d = dt.toString();
        let date = d.substring(4,15);
        let hour = parseInt(d.substring(16,18));
        let min = d.substring(19,21);
        let ap = "AM";

        if(hour>12){
            hour-=12;
            ap="PM";
        }

        let time = hour.toString()+":"+min+" "+ap;


        const {ssc,gpa,hsc,cgpa,waiver} = req.body;
        const status = "pending";

        const university_id=req.session.university_id;
        const countTable = WaiverCountModel.find({university_id:university_id});
        (await countTable).forEach(function(val){
            waiver_post_id = val.next_waiver_post_id;
        });

        let WaiverPost = await new WaiverModel({
            university_id,date,time,ssc,gpa,hsc,cgpa,waiver,status,waiver_post_id
        }).save();

        res.redirect('/waiver_post');
        

    }catch(err){
        console.log(err);
    }
}


//get all Waiver Data from admissionposts collection
exports.getWaiverAPI = async (req,res)=>{
    try{
        const unidata = await UniversityModel.find({university_id:req.session.university_id});
        const waiverdata = await WaiverModel.find({status:"pending",university_id:req.session.university_id});
        res.render('./university/createuniwaiver',{
            data:unidata,
            wdata:waiverdata
        });

    }catch(err){
        console.log(err);
    }
}

//get one Waiver Data from admissionposts collection
exports.getOneWaiverDataAPI = async (req,res)=>{
    try{
        const unidata = await UniversityModel.find({university_id:req.session.university_id});
        let waiverdata = await WaiverModel.findById(req.params.id);
        res.render('./university/uniwaiverpost',{
            wdata:waiverdata,
            data:unidata
        });

    }catch(err){
        console.log(err);
    }
}

//Update one Waiver Data from admissionposts collection

exports.updateWaiverAPI = async (req,res)=>{

    try{

        const waiverDatas = {
            ssc:req.body.ssc,
            gpa:req.body.gpa,
            hsc:req.body.hsc,
            cgpa:req.body.cgpa,
            waiver:req.body.waiver,
        }

        let WaiverPost = await WaiverModel.findByIdAndUpdate(req.params.id,waiverDatas,(err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/waiver_post');
            }
        });

        res.redirect('/waiver_post');



    }catch(err){
        console.log(err);
    }

}




//Delete Waiver one Data from admissionposts collection
exports.deleteWaiverAPI = (req,res)=>{

        WaiverModel.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
            if(err) throw err;
            res.redirect('/waiver_post');
        });
    
}


//get Waiver count table data of university posts
exports.getUniversityWaiverPostCountAPI = async (req,res)=>{
    try{
        const uniwaivercountdata = await WaiverCountModel.find({status:"pending"});
        res.render('./admin/waivercount',{
            data:uniwaivercountdata
        });

    }catch(err){
        console.log(err);
    }
}




exports.checklogin = async (req,res)=>{
    let unidata = await UniversityModel.find({username:req.body.username});

    
    unidata.forEach(function(val){
        if(val.username==req.body.username && val.password == req.body.password){
           
            req.session.university_id=val.university_id;
            res.send(val.university_id);
        }
        else{
            res.send("failed");
        }
    });
}


exports.checkadminlogin = async (req,res)=>{
  
        let admindata = await admin.find({admin_name:req.body.admin_name});

        if(admindata.length != 0){
            admindata.forEach(function(val){
                console.log(val.password);
                if(val.admin_name==req.body.admin_name && val.password == req.body.password){
                    req.session.admin_id=val.admin_id;
                    res.send(val.admin_id);
                }
                else{
                    res.send("password");
                }
            });
        }else{
            res.send("user");
        }
   
}