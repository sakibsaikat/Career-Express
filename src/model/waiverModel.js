const mongo = require('mongoose');

let waiverSchema = new mongo.Schema({
    university_id:{
        type:String
    },
    waiver_post_id:{
        type:String
    },
    
    date:{
        type:String
    },
    time:{
        type:String
    },
    ssc:{
        type:String,
        required:true
    },
    gpa:{
        type:String,
        required:true
    },
    hsc:{
        type:String,
        required:true
    },
    cgpa:{
        type:String,
        required:true
    },
    waiver:{
        type:String,
        required:true
    },
    status:{
        type:String
    }
    
});

let waiverpost = mongo.model('waiver_post',waiverSchema);
module.exports = waiverpost;