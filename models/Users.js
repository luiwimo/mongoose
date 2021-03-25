const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:String,
    email:{
        type: String,
        unique: true,
        required: true
    },
    passwsord:String,
    age:{
        type:Number,
        default: 0
    },
    gender:{
        type:String,
        enum:['M','F','O']
    },
    birth_date: Date,
    photo:String
}, {timestamps:true})

const users = mongoose.model('users',UserSchema)

module.exports = users;