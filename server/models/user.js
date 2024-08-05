const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type: String,
        default:``
    },
    bio:{
        type:String,
        default: ""
    }
})

module.exports = mongoose.model('User',UserSchema);