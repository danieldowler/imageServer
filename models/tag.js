const mongoose= require('mongoose');

const tagSchema= mongoose.Schema({
    name:{
        type: String, require: true
    },
    date:{
        type: String, require: true
    }
});

const Tag= mongoose.model('Tag', tagSchema);

module.exports= Tag;