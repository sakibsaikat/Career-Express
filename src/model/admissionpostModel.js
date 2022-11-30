const mongo = require('mongoose');

const AdmissionSchema = new mongo.Schema({
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    post_id:{
        type: String,
        required:true
    },
    university_id:{
        type: String,
        required:true
    },
    status:{
        type:String
    }
});


let admission = mongo.model('admission',AdmissionSchema);
module.exports = admission;