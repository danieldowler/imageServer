const express= require('express');
const router= express.Router();
const User= require('User');

const requiredFields = ['username', 'password'];
const missingField = requiredFields.find(field => !(field in req.body));

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser);

router.post(
    
);
router.delete();
router.put();