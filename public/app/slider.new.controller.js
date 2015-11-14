;(function(){

  angular
    .module('j3p')
    .controller('SliderNewController', SliderNewController);

  SliderNewController.$inject = ['$scope', 'Slider', '$rootScope'];

  function SliderNewController($scope, Slider, $rootScope){
    var vm = this;

    vm.item = {
      pic: '',
      title: '',
      data: {
        description: ''
      }
    };
    
    $rootScope.pageTitle = 'Slider Items';
    $rootScope.description = '';

    vm.save = save;

    function save(){
      Slider
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
