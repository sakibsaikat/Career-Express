const mongoose =require('mongoose');
const Schema = mongoose.Schema;

let bracSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    dateofbirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    file: {
        type: String
    }
});

module.exports = mongoose.model('brac', bracSchema);