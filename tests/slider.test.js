var assert = require('assert');
require('dotenv').load();

var Slider = require('../models/slider');

beforeEach(function(){
  return Slider
    .truncate()
    .then(function(){
      return Slider.create({
        title: 'sample',
        order: 1,
        pic: 'sample.jpg'
      })
    });
});

describe('Slider', function() {
  this.timeout(0)
  it('table should exists', function() {
    return Slider.findAll({
      where: {
        title: 'sample'
      }
    }).then(function(items){
      assert(items.length === 1);
    });
  });

  it('#getMaxOrder should have max value', function() {
    return Slider
      .getMaxOrder()
      .then(function(max) {
        assert(max === 1);
       });
  });

  it('#getMaxOrder should return NaN when no row is present', function() {
    return Slider
      .truncate()
      .then(function() {
        return Slider
          .getMaxOrder()
          .then(function(max) {
            assert(max !== max);
           });
       });
  });

  it('#saveMe should save and increment order properly', function() {
    return Slider.saveMe({
      title: 'new',
      pic: 'sample2.jpg'
    }).then(function() {

      return Slider.find({
        where: {
          title: 'new'
        }
      }).then(function(item) {
          assert(item.order == 2);
      })

    });

  });

  it('#reorder should arrange orders sequentially', function() {
    return Slider.bulkCreate([{
      title: 'new2',
      pic: 'sample2.jpg',
      order: 2
    },{
      title: 'new3',
      pic: 'sample3.jpg',
      order: 3
    },{
      title: 'new4',
      pic: 'sample4.jpg',
      order: 4
    },{
      title: 'new5',
      pic: 'sample5.jpg',
      order: 5
    }]).then(function() {
      return Slider.find({
        where:{
          order: 4
        }
      }).then(function(item) {
        return Slider
          .reorder(item.id, item.order, 1)
          .then(function() {
            return Slider
              .findAll({
                order:['order']
              })
              .then(function(items) {
                assert(items[0].title === 'new4')
                assert(items[1].title === 'sample')
                assert(items[2].title === 'new2')
              });
          });
        });
      });

  })

  it('#remove should remove an item', function(){
     return Slider.bulkCreate([{
       title: 'new2',
       pic: 'sample2.jpg',
       order: 2
     },{
       title: 'new3',
       pic: 'sample3.jpg',
       order: 3
     },{
       title: 'new4',
       pic: 'sample4.jpg',
       order: 4
     },{
       title: 'new5',
       pic: 'sample5.jpg',
       order: 5
     }]).then(function() {
       return Slider.find({
         where:{
           order: 4
         }
       }).then(function(item) {
         return Slider
           .remove(item.id, 4)
           .then(function() {
             return Slider
               .findAll({
                 order:['order']
               })
               .then(function(items) {
                 assert(items[0].title !== 'new4')
                 assert(items[0].title === 'sample')
                 assert(items[1].title === 'new2')
               });
           });
         });
       });
  })

});