;(function() {

  angular
    .module('core')
    .service('About',about);

  about.$inject = ['$http'];
  
  function about(http) {
    
    var apiUrl = '/api/about/items/';
    var service = {
      query: query,
      get: get,
      update: edit
    }

    return service;
    
    function query(params){
      return http
        .get(apiUrl,{
          params:params
        });
    }

    function get(id){
      return http
        .get(apiUrl+id);  
    }

    function edit(id, params){
      return http
        .post(apiUrl+id,params);
    }

  }  

})();