const mongoose = require('mongoose');
const Vlog = require('./vlogModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    Vlogs: [{
        type:mongoose.Types.ObjectId,
        ref: "Vlog",
        require: true,
    }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
