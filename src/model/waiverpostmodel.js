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
    waiver_post_id:{
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


let admission = mongo.model('waiver',AdmissionSchema);
module.exports = admission;