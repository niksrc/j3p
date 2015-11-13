var Sequelize = require('sequelize')
var db = require('../lib/db');

var Slider = db.define('slider', {
  title: Sequelize.STRING,
  order: Sequelize.BIGINT,
  pic: Sequelize.STRING,
},{
  classMethods: {
    getMaxOrder: function() {
      return Slider.max('order');
    },
    /*
    * Reorder increments or decrements items between prev and new order
    * inclusive of new order depending on the direction.
    **/
    reorder: function(id, prevOrder,newOrder) {

      var direction = newOrder < prevOrder
      var inc = (direction)? ' + ':' - ';
      var between = [prevOrder,newOrder].sort();
      var query = 'UPDATE sliders SET "order" = "order"' + inc + 1;
      query += ' where "order" BETWEEN ' + between.join(' AND ');

      return db.query(query)
      .then(function(response){

        return Slider.update({
          order: newOrder
        },{
          where:{
            id: id
          }
        })

      });



    },
    saveMe: function(attributes) {
      return Slider
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          attributes.order = value+1;
          return Slider.create(attributes);
        })
    },
    remove: function(id, order) {
      return Slider
        .getMaxOrder()
        .then(function(value){
          value = value || 0;
          value += 1;
          return Slider
            .reorder(id, order, value)
            .then(function(response){
              return Slider.destroy({
                where: {
                  order: value
                }
              })
            })
        })
        
    }
  }
})

Slider.sync({});
module.exports = Slider;