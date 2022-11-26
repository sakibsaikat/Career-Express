const { ObjectId } = require('mongodb');
let mongo = require('mongoose');
let PostModel = require('./../model/unipostModel');

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

exports.deleteDataAPI = (req,res)=>{


        PostModel.findOneAndDelete({_id:req.params.id},(err)=>{
            if(!err){
                res.redirect('./uc_post');
            }else{
                console.log(err);
            }
        });
        

    
}