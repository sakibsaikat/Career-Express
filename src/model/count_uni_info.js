const mongo = require('mongoose');

let countShema = new mongo.Schema({
    university_id:{
        type:String,
        required:true,
        unique:true
    },
    total_post:{
        type:String,
        required:true
    },
    next_post_id:{
        type:String,
        required:true
    }
});

let CountSchema = mongo.model('count_university_info',countShema);
module.exports = CountSchema;