const mongo = require('mongoose');

let countWaiverSchema = new mongo.Schema({
    university_id:{
        type:String,
        required:true,
        unique:true
    },
    total_waiver_post:{
        type:String,
        required:true
    },
    next_waiver_post_id:{
        type:String,
        required:true
    }
});

let CountWaiverSchema = mongo.model('count_universityWaiver_info',countWaiverSchema);
module.exports = CountWaiverSchema;