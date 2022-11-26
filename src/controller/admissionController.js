const { ObjectId } = require('mongodb');
const mongo = require('mongoose');
const Admission = require('./../model/admissionpostModel');


exports.SendUserDataAPI = async (req,res)=>{
    try{
        const {catagory, area, description, image,heading} = req.body;
        
        const status = "pending";
        const date = new Date();

         const AdmissionPostData = await new Admission({
             date,
             catagory,
             area,
             description,
             image,
             heading,
             status
         }).save();

        res.render('/admission');

    }catch(err){
        console.log(err);
    }
}


exports.UpdateUserDataAPI =  (req,res)=>{

        const mydata = {
            catagory:req.body.catagory,
            area:req.body.area,
            status:req.body.status,
            description:req.body.description,
            heading:req.body.heading
        };

        Admission.findByIdAndUpdate(req.params.id,mydata,(err)=>{
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
        res.render('admissiondashboard',{
            postData:AdmissionData
        });

    }catch(err){
        console.log(err);
    }
}


exports.GetUserPostAPI = async (req,res)=>{
    try{
        const AdmissionData = await Admission.find();
        res.render('index',{
            postData:AdmissionData
        });

    }catch(err){
        console.log(err);
    }
}

exports.GetCUserDataAPI = async (req,res)=>{
    try{
        const AdmissionData = await Admission.find();
        res.render('admissioncdash',{
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