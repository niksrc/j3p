;(function(){

  angular
    .module('j3p')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope', 'About', '$rootScope'];

  function AboutController($scope, About, $rootScope){
    var vm = this;

    vm.items = [];
    vm.params = {
      limit: 20,
      offset: 0, 
    }
    
    $rootScope.pageTitle = 'About Us';
    $rootScope.description = '';


    vm.fetch = fetch;
    vm.refresh = fetch;
    fetch();

    function fetch(){
      About
        .query(vm.params)
        .then(function (items){
          vm.items = items.data;
        },function (){
          vm.items = [];
        })
    }

  }


})();
