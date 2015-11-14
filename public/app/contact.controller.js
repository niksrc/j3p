;(function(){

  angular
    .module('j3p')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$scope', 'Contact', '$rootScope'];

  function ContactController($scope, Contact, $rootScope){
    var vm = this;

    vm.items = [];
    vm.params = {
      limit: 20,
      offset: 0, 
    }
    
    $rootScope.pageTitle = 'Contact Us';
    $rootScope.description = '';


    vm.fetch = fetch;
    vm.refresh = fetch;
    fetch();

    function fetch(){
      Contact
        .query(vm.params)
        .then(function (items){
          vm.items = items.data;
        },function (){
          vm.items = [];
        })
    }

  }


})();
