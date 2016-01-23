;(function(){

  angular
    .module('j3p')
    .controller('CafeEditController', CafeEditController);

  CafeEditController.$inject = ['$scope', 'Cafe', '$rootScope', '$routeParams'];

  function CafeEditController($scope, Cafe, $rootScope, $routeParams){
    var vm = this;
    vm.id = $routeParams.id;
    vm.pic = {
      url: undefined
    };
    vm.item = {
      pic: null,
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'Cafe';
    $rootScope.description = '';

    vm.update = update;
    vm.sync = sync;

    sync();
    
    function update(){
      Cafe
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
      Cafe
        .get(vm.id)
        .then(function(response) {
          vm.pic.url = response.data.pic;
          vm.item = response.data;
        })
    }
  
  }

})();
