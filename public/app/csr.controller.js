;(function(){

  angular
    .module('j3p')
    .controller('CsrController', CsrController);

  CsrController.$inject = ['$scope', 'Csr', '$rootScope'];

  function CsrController($scope, Csr, $rootScope){
    var vm = this;

    vm.items = [];
    vm.params = {
      limit: 20,
      offset: 0, 
    }
    
    $rootScope.pageTitle = 'CSR Activities';
    $rootScope.description = '';


    vm.fetch = fetch;
    vm.reorder = reorder;
    vm.refresh = fetch;
    vm.remove = remove;
    fetch();

    function fetch(){
      Csr
        .query(vm.params)
        .then(function (items){
          vm.items = items.data;
        },function (){
          vm.items = [];
        })
    }
    function reorder(item, prevIndex, newIndex){
      var diff = prevIndex - newIndex;

      Csr
        .reorder({
          id: item.id,
          diff: diff
        })
        .then(function(response){
          if(!response.error){
            $scope.$emit('notify','Reordered');
          }else{
            $scope.$emit('notify','Unable to reorder');
            fetch();
          }

        })
    }

    function remove(id, index, order){
      Csr
        .remove(id, order)
        .then(function (response){
            if(response.error)
              $scope.$emit('notify','Unable to remove');
            else{
              vm.items.splice(index,1);  
              $scope.$emit('notify','Removed');
            }
        })
    }
  }


})();
