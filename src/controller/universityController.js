const { ObjectId } = require('mongodb');
let mongo = require('mongoose');
let PostModel = require('./../model/unipostModel');
let UniversityModel = require('./../model/universityModel');
let UniversityCountModel = require('./../model/count_uni_info');
let AdmissionPostModel = require('./../model/admissionpostModel');



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
        const university_id = "NUB36";


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
        const postdata = await PostModel.find({status:"NULL"});
        res.render('./university/createunipost',{
            data:postdata
        });

    }catch(err){
        console.log(err);
    }
}

//get one Data from admissionposts collection
exports.getOneDataAPI = async (req,res)=>{
    try{
        let postdata = await PostModel.findById(req.params.id);
        res.render('./university/upunipost',{
            data:postdata
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

        PostModel.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
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
        const unidata = await UniversityModel.find({status:"approved"});
        res.render('./admin/uniapprovelist',{
            data:unidata
        });

    }catch(err){
        console.log(err);
    }
}
//get all Data from pending universityList collection
exports.getUniversityReqDataAPI = async (req,res)=>{
    try{
        const unidata = await UniversityModel.find({status:"pending"});
        res.render('./admin/unilist',{
            data:unidata
        });

    }catch(err){
        console.log(err);
    }
}




//get count table data of university posts
exports.getUniversityPostCountAPI = async (req,res)=>{
    try{
        const unicountdata = await UniversityCountModel.find({status:"pending"});
        res.render('./admin/postcount',{
            data:unicountdata
        });

    }catch(err){
        console.log(err);
    }
}


//get All pending admission post request of university
exports.getUniversityAllPostAPI = async (req,res)=>{
    try{
        const adpostdata = await AdmissionPostModel.find({status:"pending"});
        res.render('admin/postdetails',{
            data:adpostdata
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


        let CountPost = await new UniversityCountModel({
            university_id,total_post,next_post_id
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

