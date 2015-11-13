;(function(){

  angular
    .module('j3p')
    .controller('EthnicEditController', EthnicEditController);

  EthnicEditController.$inject = ['$scope', 'Ethnic', '$rootScope', '$routeParams'];

  function EthnicEditController($scope, Ethnic, $rootScope, $routeParams){
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
    
    $rootScope.pageTitle = 'Ethnic Collections';
    $rootScope.description = '';

    vm.update = update;
    vm.sync = sync;

    sync();
    
    function update(){
      Ethnic
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
      Ethnic
        .get(vm.id)
        .then(function(response) {
          vm.pic.url = response.data.pic;
          vm.item = response.data;
        })
    }
  
  }

})();
