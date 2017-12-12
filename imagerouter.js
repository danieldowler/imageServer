const express = require('express');
const router = express.Router();
const Image = require('./models/image');
const fileUpload = require('express-fileupload');
const admin = require("firebase-admin");
const Storage = require('@google-cloud/storage');
const images= require ('./images.js');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser);
/*router.use(fileUpload());*/

router.get('/', (req, res) => {
    Image.find().then(images => {
        res.json(images);
    })
});


router.post('/', images.multer.single('file'),
images.sendUploadToGCS, (req, res) => {
    let data = req.body;
    console.log(data);
    
        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        if (req.file && req.file.cloudStoragePublicUrl) {
          data.url = req.file.cloudStoragePublicUrl;
        };
    /*console.log(req.files);
    var serviceAccount = require("./image-capstone-firebase.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "imageBucket.appspot.com"
    });
    const base64data = new Buffer(req.files.file.data, 'binary');
    storage.bucket('imageBucket').upload(base64data).then(()=>{console.log('file uploaded')});*/
    Image.create(data).then(image => res.json(image));
    
});

router.put('/', (req, res) => {
    Image.findByIdAndUpdate(req.body._id, req.body).then(image => res.json(image))
});

router.delete('/:id', (req, res) => {
    Image.findByIdAndRemove(req.params.id).then(() => res.status(204).end());
});



module.exports = router;