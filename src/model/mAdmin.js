let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let adminSchema = new Schema({
    admin_id:{
        type: String,
        required: true,
        trim: true
    },
    admin_name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String
    }

});

module.exports = mongoose.model('admin', adminSchema);