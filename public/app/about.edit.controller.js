;(function(){

  angular
    .module('j3p')
    .controller('AboutEditController', AboutEditController);

  AboutEditController.$inject = ['$scope', 'About', '$rootScope', '$routeParams'];

  function AboutEditController($scope, About, $rootScope, $routeParams){
    var vm = this;
    vm.id = $routeParams.id;
    vm.item = {
      data: {
        content: ''
      }
    };
    
    $rootScope.pageTitle = 'About Us';
    $rootScope.description = '';

    vm.update = update;
    vm.sync = sync;

    sync();
    
    function update(){
      About
        .update(vm.id,vm.item)
        .then(function (response){
          if(response.error){
            $scope.$emit('notify','Error! Unable to update');    
          }else{
            $scope.$emit('notify','Updated !');
            vm.sync();    
          }
        },function (){
          $scope.$emit('notify','Unable to connect');    
        })
    }

    function sync(){
      About
        .get(vm.id)
        .then(function(response) {
          vm.item = response.data;
        })
    }
  
  }

})();
