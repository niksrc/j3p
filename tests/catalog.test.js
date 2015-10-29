var assert = require('assert');
require('dotenv').load();

var Catalog = require('../models/catalog');

beforeEach(function(){
  return Catalog
    .truncate()
    .then(function(){
      return Catalog.create({
        title: 'sample',
        order: 1,
        pic: 'sample.jpg',
        data: {
          name: 'hello'
        }
      })
    });
});

describe('Catalog', function() {
  it('table should exists', function() {
    return Catalog.findAll({
      where: {
        title: 'sample'
      }
    }).then(function(items){
      assert(items.length === 1);
    });
  });

  it('#getMaxOrder should have max value', function() {
    return Catalog
      .getMaxOrder()
      .then(function(max) {
        assert(max === 1);
       });
  });

  it('#getMaxOrder should return NaN when no row is present', function() {
    return Catalog
      .truncate()
      .then(function() {
        return Catalog
          .getMaxOrder()
          .then(function(max) {
            assert(max !== max);
           });
       });
  });

  it('#saveMe should save and increment order properly', function() {
    return Catalog.saveMe({
      title: 'new',
      pic: 'sample2.jpg',
      data: {
      name: 'world'
      }
    }).then(function() {

      return Catalog.find({
        where: {
          title: 'new'
        }
      }).then(function(catalog) {
          assert(catalog.order == 2);
      })

    });

  });

  it('#reorder should arrange orders sequentially', function() {
    return Catalog.bulkCreate([{
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
      return Catalog.find({
        where:{
          order: 4
        }
      }).then(function(item) {
        return Catalog
          .reorder(item.id, item.order, 1)
          .then(function() {
            return Catalog
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

});