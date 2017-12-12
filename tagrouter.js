const express= require('express');
const router= express.Router();
const Tag= require('./models/tag');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser);

router.get ('/', (req, res ) =>{
Tag.find().then(tags => {
    res.json(tags);
})
});

router.post('/', (req,res) =>{
    Tag.create(req.body).then(tag => res.json(tag));
});

router.put('/', (req,res) =>{
Tag.findByIdAndUpdate(req.body._id, req.body).then(tag => res.json(tag))
});

router.delete('/:id', (req,res) =>{
Tag.findByIdAndRemove(req.params.id).then(() => res.status(204).end());
});



module.exports= router;