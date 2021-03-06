'use strict';
require('dotenv').config();
const express= require('express');
const app= express();
const mongoose= require('mongoose');
const cors= require('cors');
const path= require('path');
const passport= require('passport');

mongoose.Promises= global.Promises;

const {PORT, DATABASE_URL}= require('./config.js');
/*const {TAGS}=require('./tagmodel');*/
const {localStrategy, jwtStrategy } = require('./authStrategies');
const {router: authRouter} =require('./authrouter')

const tagrouter= require('./tagrouter.js');
const imagerouter= require ('./imagerouter.js');
const userrouter= require('./userrouter.js');

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(cors({
    origin: ['http://localhost:8000']
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", authRouter);
app.use('/tag', tagrouter);
app.use('/image', imagerouter);
app.use('/images', imagerouter);
app.use('/user', userrouter);

app.use('/', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
  });

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};  

    
module.exports = {app, runServer, closeServer};