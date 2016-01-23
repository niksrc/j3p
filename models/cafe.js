var Sequelize = require('sequelize')
var db = require('../lib/db');

var Cafe = db.define('cafes', {
  title: Sequelize.STRING,
  order: Sequelize.BIGINT,
  pic: Sequelize.STRING,
  data: Sequelize.JSON,
},{
  classMethods: {
    getMaxOrder: function() {
      return Cafe.max('order');
    },
    /*
    * Reorder increments or decrements items between prev and new order
    * inclusive of new order depending on the direction.
    **/
    reorder: function(id, prevOrder,newOrder) {

      var direction = newOrder < prevOrder
      var inc = (direction)? ' + ':' - ';
      var between = [prevOrder,newOrder].sort();
      var query = 'UPDATE cafes SET "order" = "order"' + inc + 1;
      query += ' where "order" BETWEEN ' + between.join(' AND ');

      return db.query(query)
      .then(function(response){

        return Cafe.update({
          order: newOrder
        },{
          where:{
            id: id
          }
        })

      });



    },
    saveMe: function(attributes) {
      return Cafe
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          attributes.order = value+1;
          return Cafe.create(attributes);
        })
    },
    remove: function(id, order) {
      return Cafe
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          value += 1;
          return Cafe
            .reorder(id, order, value)
            .then(function(response){
              return Cafe.destroy({
                where: {
                  order: value
                }
              })
            })
        })
        
    }
  }
})

Cafe.sync({});
module.exports = Cafe;