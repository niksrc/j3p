var express = require('express');
var multer = require('multer')
var Ethnic = require('../models/ethnic');
var crypto = require('crypto');
var mime = require('mime');
var router = express.Router();
var fs = require('fs');
/* Multer config */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/ethnic/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
})

var upload = multer({ storage: storage })
/*
* These routes are for items present in catalogs.
*
**/

/* GET items listing. */
router.get('/items/', function(req, res, next) {
  var limit = req.query.limit || 20;
  var offset = req.query.offset || 0;

  Ethnic.findAll({
    limit: limit,
    offset: offset,
    order:[['order', 'DESC']]
  })
  .then(function(items){
    res.send(items);
  })
});

/* GET item with a given id. */
router.get('/items/:id', function(req, res, next) {
  var id = req.params.id;

  if(id !== undefined)
    Ethnic.findById(id)
    .then(function(item){
      res.send(item);
    })
  else
    res.end();
});

router.post('/items/', upload.single('pic') , function(req, res, next) {
  req.body.pic = req.file.filename;

  Ethnic.saveMe(req.body)
  .then(function(){
    res.send({'error': false});
  })
  .catch(function(){
    res.send({'error': true});
  })

});

router.post('/items/reorder', function(req, res, next) {
  var id = req.body.id;
  var prevOrder = req.body.prevOrder;
  var newOrder = req.body.newOrder;

  Ethnic.reorder(id, prevOrder, newOrder)
  .then(function(){
    res.send({'error': false});
  })
  .catch(function(){
    res.send({'error': true});
  })

});

router.post('/items/:id', upload.single('pic') , function(req, res, next) {
  var id = req.params.id;

  Ethnic.findById(id)
  .then(function(item){
      if(req.file !== undefined){
        req.body.pic = req.file.filename;
        fs.unlink('public/images/ethnic/'+item.pic,function(err){
          console.log(err);
        });
      }
    
      Ethnic.update(req.body,{
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

router.delete('/items/:id', function(req, res, next) {
  var id = req.params.id;
  var order = +req.body.order;

  Ethnic.remove(id, order)
    .then(function(affectedRows){
      if(affectedRows == 1)
        res.send({'error': false});
      else
        res.send({'error': true});
    })
  })

module.exports = router;
