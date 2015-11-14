;(function(){

  angular
    .module('j3p')
    .controller('WomensNewController', WomensNewController);

  WomensNewController.$inject = ['$scope', 'Womens', '$rootScope'];

  function WomensNewController($scope, Womens, $rootScope){
    var vm = this;

    vm.item = {
      pic: '',
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'Womens Collections';
    $rootScope.description = '';

    vm.save = save;

    function save(){
      Womens
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
