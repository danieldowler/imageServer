const faker = require('faker');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');

const expect = chai.expect;

chai.use(chaiHttp);

const { app, runServer, closeServer } = require('../server');

let server;

describe('../images', function () {
    before(function () {
        return runServer();
    });
    after(function () {
        return closeServer();
    });
    it('should return all existing images', function () {
        return chai.request(app)
            .get('/images')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.above(0);
                res.body.forEach(function (item) {
                    expect(item).to.be.a('object');
                    expect(item).to.contain.all.keys(
                        'title', 'URL', 'tags');
                });
            });
    });
    it('should list images on POST', function () {
        const newImage = { title: 'collage.jpeg', URL: 'images/collage.jpeg'};
        return chai.request(app)
            .post('/images')
            .attach('file', fs.readFileSync('collage.jpeg'), './collage.jpeg')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res).to.be.a('object');
                expect(res.body).to.include.keys('title', 'URL', 'tags');
                expect(res.body.id).to.not.equal(null);
                expect(res.body.title).to.equal(newImage.title);
                expect(res.body.URL).to.equal(newImage.URL);
            });
    });
});
