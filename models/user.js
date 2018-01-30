const mongoose= require('mongoose');
const express= require('express');

const userSchema= mongoose.Schema({
    firstName:{
        type: String, require: true
    },
    lastName:{
        type:Strong, require: true
    },
    username:{
        type: String, require: true
    },
    password:{
        type: String, require: true
    }
});

const Image= mongoose.model('User', userSchema);

module.exports= User;