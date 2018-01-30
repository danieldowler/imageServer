const express= require('express');
const router= express.Router();
const Tag= require('./models/tag');
const Image = require('./models/image')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser);

router.get ('/', (req, res ) =>{
Tag.find().then(tags => {
    res.json(tags);
})
});

router.post('/', (req,res) =>{
    console.log(req.body);
    let new_tag = {
        name: req.body.tag,
        date: Date.now()
    };
    Tag
        .create(new_tag)
        .then(tag => {
            console.log('This tag was saved', tag);
            Image.findById(req.body.image_id, (err, image) => {
                if (err){
                    console.log(err);
                    return res.json(err);
                }
              console.log('This image was loaded', image);
              if(image.tags){ image.tags.push(tag)} 
              else {image.tags = [tag]};
              image.save(() => res.json(tag));
            });

        });
});

router.put('/', (req,res) =>{
Tag.findByIdAndUpdate(req.body._id, req.body).then(tag => res.json(tag))
});

router.delete('/all', (req,res) =>{
    console.log('delete all tags');
Tag.remove({}, function(){res.status(204).end();});
});

router.delete('/:id', (req,res) =>{
Tag.findByIdAndRemove(req.params.id).then(() => res.status(204).end());
});
module.exports= router;