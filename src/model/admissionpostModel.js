const mongo = require('mongoose');

const AdmissionSchema = new mongo.Schema({
    date:{
        type:Date,
        required:true
    },
    catagory:{
        type: String,
        required:true
    },
    area:{
        type: String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type: String
    },
    status:{
        type: String,
        required:true
    }
});


let admission = mongo.model('admission',AdmissionSchema);
module.exports = admission;