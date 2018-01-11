const mongoose= require('mongoose');
const express= require('express');
const Tag= require('./tag');


const imageSchema= mongoose.Schema({
    title:{
        type: String, require: true
    },
    URL:{
        type: String, require: true
    },
    tags:[{
        type: mongoose.Schema.Types.ObjectId, ref:'Tag'
    }]
});

const Image= mongoose.model('Image', imageSchema);

module.exports= Image;