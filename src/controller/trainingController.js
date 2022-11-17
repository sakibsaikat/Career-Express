const { ObjectId } = require('mongodb');
const mongo = require('mongoose');
const Admission = require('./../model/admissionpostModel');


exports.SendUserDataAPI = async (req,res)=>{
    try{
        const {catagory, area, description, image} = req.body;
        
        const status = "pending";
        const date = new Date();
        

         const AdmissionPostData = await new Admission({
             date,
             catagory,
             area,
             description,
             image,
             status
         }).save();

        res.redirect('/admission');

    }catch(err){
        console.log(err);
    }
}


exports.UpdateUserDataAPI =  (req,res)=>{

        Admission.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,result)=>{
            if(!err){
                res.redirect('/admission');
            }
            else{
                console.log(err);
            }
         });

}

exports.GetUserDataAPI = async (req,res)=>{
    try{
        const AdmissionData = await Admission.find();
        res.render('trainingdashboard',{
            postData:AdmissionData
        });

    }catch(err){
        console.log(err);
    }
}
exports.GetCUserDataAPI = async (req,res)=>{
    try{
        const AdmissionData = await Admission.find();
        res.render('trainingcdash',{
            postData:AdmissionData
        });

    }catch(err){
        console.log(err);
    }
}

exports.GetInfoAPI = async (req,res)=>{

    try{
        const AdmissionData = await Admission.findById(req.params.id);
        res.render('upadpost',{data:AdmissionData});

    }catch(err){
        console.log(err);
    }
        
        


}