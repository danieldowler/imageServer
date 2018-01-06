const express= require('express');
const router= express.Router();
const Tag= require('./models/tag');
const image = require('./models/image')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser);

router.get ('/', (req, res ) =>{
Tag.find().then(tags => {
    res.json(tags);
})
});

router.post('/', (req,res) =>{
    let new_tag = {
        name: req.body.name,
        date: Date.now()
    };
    Tag
        .create(new_tag)
        .then(tag => {
            console.log('This tag was saved', tag);
            Image.findById(req.body.image_id, (err, image) => {
              console.log('This image was loaded', image);
              image.tags ? image.tags.push(tag) : image.tags = [tag];
              image
                  .save(() => res.json(tag));
            });

        });
});

router.put('/', (req,res) =>{
Tag.findByIdAndUpdate(req.body._id, req.body).then(tag => res.json(tag))
});

router.delete('/:id', (req,res) =>{
Tag.findByIdAndRemove(req.params.id).then(() => res.status(204).end());
});



module.exports= router;