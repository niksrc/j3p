var express = require('express');
var router = express.Router();

var Ethnic = require('../models/ethnic');
var Mens = require('../models/mens');
var Womens = require('../models/womens');
var Slider = require('../models/slider');
var About = require('../models/about');
var Contact = require('../models/contact');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  About.findAll({
    limit: 1
  })
  .then(function(items){
     return items[0]; 
    //res.render('about', items);
  })
  .then(function(about){
    Contact.findAll({
      limit: 1
    })
    .then(function(contact){
      res.render('about',{about: about,contact: contact[0]});
    })
  })
});

router.get('/contact', function(req, res, next) {
  Contact.findAll({
    limit: 1
  })
  .then(function(contact){
    res.render('contact',{contact: contact[0]});
  })
});

router.get('/admin', function(req, res, next) {
  res.sendFile('index.html',{root:'public/app/'});
});

module.exports = router;
