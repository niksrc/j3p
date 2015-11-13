var Sequelize = require('sequelize')
var db = require('../lib/db');

var Ethnic = db.define('ethnic', {
  title: Sequelize.STRING,
  order: Sequelize.BIGINT,
  pic: Sequelize.STRING,
  data: Sequelize.JSON,
},{
  classMethods: {
    getMaxOrder: function() {
      return Ethnic.max('order');
    },
    /*
    * Reorder increments or decrements items between prev and new order
    * inclusive of new order depending on the direction.
    **/
    reorder: function(id, prevOrder,newOrder) {

      var direction = newOrder < prevOrder
      var inc = (direction)? ' + ':' - ';
      var between = [prevOrder,newOrder].sort();
      var query = 'UPDATE ethnics SET "order" = "order"' + inc + 1;
      query += ' where "order" BETWEEN ' + between.join(' AND ');

      return db.query(query)
      .then(function(response){

        return Ethnic.update({
          order: newOrder
        },{
          where:{
            id: id
          }
        })

      });



    },
    saveMe: function(attributes) {
      return Ethnic
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          attributes.order = value+1;
          return Ethnic.create(attributes);
        })
    },
    remove: function(id, order) {
      return Ethnic
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          value += 1;
          return Ethnic
            .reorder(id, order, value)
            .then(function(response){
              return Ethnic.destroy({
                where: {
                  order: value
                }
              })
            })
        })
        
    }
  }
})

Ethnic.sync({});
module.exports = Ethnic;