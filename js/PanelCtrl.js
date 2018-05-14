angular.module('auditoriaApp')

.controller('PanelCtrl', function($scope, ConexionServ, $uibModal, USER, AuthServ){
    
    $scope.USER = USER;
    
    console.log('USER en Panel', $scope.USER);
    
    ConexionServ.createTables();
    
    
    
    $scope.seleccionarDistrito = function () {
        var modal = $uibModal.open({
            templateUrl: '../templates/Entidades/seleccionarDistritoModal.html',
            size: 'lg',
            resolve: {
                USER: function () {
                    return $scope.USER;
                }
            },
            controller: 'SeleccionarDistritoModalCtrl'
        });
        
        modal.result.then(function (usuario_new) {
            $scope.USER = usuario_new;
        });
    }
    
    
    $scope.cerrar_sesion = function(){
        AuthServ.cerrar_sesion();
    }
    
    
    
})

