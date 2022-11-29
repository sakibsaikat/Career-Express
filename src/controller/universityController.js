const { ObjectId } = require('mongodb');
let mongo = require('mongoose');
let PostModel = require('./../model/unipostModel');



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


        const {semester,department,degree,duration,shift,cost} = req.body;
        const post_id="NUB1";
        const university_id = "NUBS12";
        const status = "NULL";

        let UniversityPost = await new PostModel({
            university_id,date,degree,time,post_id,semester,department,duration,shift,cost,status
        }).save();

        res.redirect('/uc_post');
        

    }catch(err){
        console.log(err);
    }
}


//get all Data from admissionposts collection
exports.getDataAPI = async (req,res)=>{
    try{
        const postdata = await PostModel.find();
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