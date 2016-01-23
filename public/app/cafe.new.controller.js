;(function(){

  angular
    .module('j3p')
    .controller('CafeNewController', CafeNewController);

  CafeNewController.$inject = ['$scope', 'Cafe', '$rootScope'];

  function CafeNewController($scope, Cafe, $rootScope){
    var vm = this;

    vm.item = {
      pic: '',
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'Cafe';
    $rootScope.description = '';

    vm.save = save;

    function save(){
      Cafe
        .save(vm.item)
        .then(function (response){
          if(response.error){
            $scope.$emit('notify','Error! Unable to save');    
          }else{
            $scope.$emit('notify','Saved !');    
            vm.item = {};
          }
        },function (){
          $scope.$emit('notify','Unable to connect');    
        })
    }
  
  }

})();
