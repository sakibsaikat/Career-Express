const mongo = require('mongoose');
const Users = require('./../model/userModel');

exports.SendUserDataAPI = async (req,res)=>{
    try{
        const user = await new Users(req.body).save();
        res.send("sent");

    }catch(err){
        console.log(err);
    }
}