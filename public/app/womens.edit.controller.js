;(function(){

  angular
    .module('j3p')
    .controller('WomensEditController', WomensEditController);

  WomensEditController.$inject = ['$scope', 'Womens', '$rootScope', '$routeParams'];

  function WomensEditController($scope, Womens, $rootScope, $routeParams){
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
    
    $rootScope.pageTitle = 'Womens Collections';
    $rootScope.description = '';

    vm.update = update;
    vm.sync = sync;

    sync();
    
    function update(){
      Womens
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
      Womens
        .get(vm.id)
        .then(function(response) {
          vm.pic.url = response.data.pic;
          vm.item = response.data;
        })
    }
  
  }

})();
