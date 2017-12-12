'use strict';
const express= require('express');
const app= express();
const mongoose= require('mongoose');

mongoose.Promises= global.Promises;

const {PORT, DATABASE_URL}= require('./config.js');
/*const {TAGS}=require('./tagmodel');*/

const tagrouter= require('./tagrouter.js');
const imagerouter= require ('./imagerouter.js');

app.use(express.static('public'));

app.use('/tag', tagrouter);
app.use('/image', imagerouter)

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