const mongo = require('mongoose');

let postSchema = new mongo.Schema({
    university_id:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    post_id:{
        type:String
    },
    degree:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    shift:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    t_credit:{
        type:String,
        required:true
    },
    pc_cost:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    status:{
        type:String
    }

});

let unipost = mongo.model('university_post',postSchema);
module.exports = unipost;