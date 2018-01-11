const express = require('express');
const router = express.Router();
const Image = require('./models/image');
const fileUpload = require('express-fileupload');
const path = require('path');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser);
router.use(fileUpload());

router.get('/', (req, res) => {
    Image.find().then(images => {
        res.json(images);
    })
});

router.get("/:id", (req, res) =>{
    Image.findOne({_id: req.params.id})
    .populate({path:"tags"}).exec((err, image)=>{res.json(image);
    })
})

router.post('/', (req, res) => {
    let data = req.body;
    console.log(data);
    if(req.files){
        let file = req.files.file;
        file.mv(path.join( __dirname, 'public/images/' + file.name), err => {
            if(err) {
                return res.status(500).send(err);
            }
            Image.create({
                title:file.name,
                URL:'images/' + file.name
            }).then(image => res.json(image)).catch(err => console.log(err));
        });
    };
});

router.put('/', (req, res) => {
    Image.findByIdAndUpdate(req.body._id, req.body).then(image => res.json(image))
    Image.populate(image, opts,(err,image)

)
});

router.delete('/:id', (req, res) => {
    Image.findByIdAndRemove(req.params.id).then(() => res.status(204).end());
});



module.exports = router;