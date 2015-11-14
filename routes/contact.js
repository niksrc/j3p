var express = require('express');
var multer = require('multer')
var Contact = require('../models/contact');
var crypto = require('crypto');
var mime = require('mime');
var router = express.Router();
var fs = require('fs');
/* Multer config */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/contact/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
})

var upload = multer({ storage: storage })
/*
* These routes are for content in Contact page.
*
**/

/* GET the content as we need only one we limit it to 1. */
router.get('/items/', function(req, res, next) {
  var limit = req.query.limit || 1;
  var offset = req.query.offset || 0;

  Contact.findAll({
    limit: limit,
    offset: offset,
  })
  .then(function(items){
    res.send(items);
  })
});

/* GET content with a given id. */
router.get('/items/:id', function(req, res, next) {
  var id = req.params.id;

  if(id !== undefined)
    Contact.findById(id)
    .then(function(item){
      res.send(item);
    })
  else
    res.end();
});

router.post('/items/:id', upload.single('data.pic') , function(req, res, next) {
  var id = req.params.id;
  console.log(req.body);
  Contact.findById(id)
  .then(function(item){
      if(req.file !== undefined){
        req.body['data.pic'] = req.file.filename;
        fs.unlink('public/images/contact/'+item.pic,function(err){
          console.log(err);
        });
      }
    
      Contact.update(req.body,{
        where:{
          id:item.id
        }
      })
      .then(function(affectedRows){
        if(affectedRows == 1)
          res.send({'error': false});
        else
          res.send({'error': true});
      })
  
  })

});

module.exports = router;
