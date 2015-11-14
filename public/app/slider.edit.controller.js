;(function(){

  angular
    .module('j3p')
    .controller('SliderEditController', SliderEditController);

  SliderEditController.$inject = ['$scope', 'Slider', '$rootScope', '$routeParams'];

  function SliderEditController($scope, Slider, $rootScope, $routeParams){
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
    
    $rootScope.pageTitle = 'Slider Items';
    $rootScope.description = '';

    vm.update = update;
    vm.sync = sync;

    sync();
    
    function update(){
      Slider
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
      Slider
        .get(vm.id)
        .then(function(response) {
          vm.pic.url = response.data.pic;
          vm.item = response.data;
        })
    }
  
  }

})();
