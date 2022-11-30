const mongo = require('mongoose');
const Users = require('./../model/userModel');

exports.SendUserDataAPI = async (req,res)=>{
    try{

        const {fullname,email,password,interest,gender,mobile,location} = req.body;
        const dateofbirth = req.body.db;
        
        const user = await new Users({
            fullname,email,password,interest,gender,dateofbirth,mobile,location
        }).save();
        res.send("sent");

    }catch(err){
        console.log(err);
    }
}


exports.getAllUserDataAPI = async (req,res)=>{
    try{

        const userdata = await Users.find();
        res.render('./admin/userlist',{
            datas:userdata
        });

    }catch(err){
        console.log(err);
    }
}



exports.deleteUserAPI = (req,res)=>{
    Users.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(err) throw err;
        res.redirect('/userlist');
    });
}