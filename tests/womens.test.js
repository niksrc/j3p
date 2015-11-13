var assert = require('assert');
require('dotenv').load();

var Womens = require('../models/womens');

beforeEach(function(){
  return Womens
    .truncate()
    .then(function(){
      return Womens.create({
        title: 'sample',
        order: 1,
        pic: 'sample.jpg',
        data: {
          name: 'hello'
        }
      })
    });
});

describe('Womens', function() {
  it('table should exists', function() {
    return Womens.findAll({
      where: {
        title: 'sample'
      }
    }).then(function(items){
      assert(items.length === 1);
    });
  });

  it('#getMaxOrder should have max value', function() {
    return Womens
      .getMaxOrder()
      .then(function(max) {
        assert(max === 1);
       });
  });

  it('#getMaxOrder should return NaN when no row is present', function() {
    return Womens
      .truncate()
      .then(function() {
        return Womens
          .getMaxOrder()
          .then(function(max) {
            assert(max !== max);
           });
       });
  });

  it('#saveMe should save and increment order properly', function() {
    return Womens.saveMe({
      title: 'new',
      pic: 'sample2.jpg',
      data: {
      name: 'world'
      }
    }).then(function() {

      return Womens.find({
        where: {
          title: 'new'
        }
      }).then(function(item) {
          assert(item.order == 2);
      })

    });

  });

  it('#reorder should arrange orders sequentially', function() {
    return Womens.bulkCreate([{
      title: 'new2',
      pic: 'sample2.jpg',
      order: 2,
      data: {
      name: 'world'
      }
    },{
      title: 'new3',
      pic: 'sample3.jpg',
      order: 3,
      data: {
      name: 'world'
      }
    },{
      title: 'new4',
      pic: 'sample4.jpg',
      order: 4,
      data: {
      name: 'world'
      }
    },{
      title: 'new5',
      pic: 'sample5.jpg',
      order: 5,
      data: {
      name: 'world'
      }
    }]).then(function() {
      return Womens.find({
        where:{
          order: 4
        }
      }).then(function(item) {
        return Womens
          .reorder(item.id, item.order, 1)
          .then(function() {
            return Womens
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
     return Womens.bulkCreate([{
       title: 'new2',
       pic: 'sample2.jpg',
       order: 2,
       data: {
       name: 'world'
       }
     },{
       title: 'new3',
       pic: 'sample3.jpg',
       order: 3,
       data: {
       name: 'world'
       }
     },{
       title: 'new4',
       pic: 'sample4.jpg',
       order: 4,
       data: {
       name: 'world'
       }
     },{
       title: 'new5',
       pic: 'sample5.jpg',
       order: 5,
       data: {
       name: 'world'
       }
     }]).then(function() {
       return Womens.find({
         where:{
           order: 4
         }
       }).then(function(item) {
         return Womens
           .remove(item.id, 4)
           .then(function() {
             return Womens
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