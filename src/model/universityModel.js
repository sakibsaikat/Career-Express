const mongo = require('mongoose');

let universitySchema = new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ugcstatus:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    eveningstatus:{
        type:String,
        required:true
    }
});

let university = mongo.model('university',universitySchema);
module.exports = university;
