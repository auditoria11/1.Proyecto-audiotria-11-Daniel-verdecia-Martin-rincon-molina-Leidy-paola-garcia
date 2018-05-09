angular.module('auditoriaApp')

.controller('PanelCtrl', function($scope, ConexionServ){
    
    
    ConexionServ.createTables();
    
    if (localStorage.logueado){
        if (localStorage.logueado == 'true'){
            $scope.user = JSON.parse(localStorage.user);
            console.log($scope.user);
            
        }else{
            $state.go('login')
        }
    }
    
    
    
})



.controller('LoginCtrl', function($scope, $state, ConexionServ){
    
    $scope.user = {}
    
    
    if (localStorage.logueado){
        if (localStorage.logueado == 'true'){
            $state.go('panel')
        }
    }
    
    $scope.entrar = function(user){
        
        consulta = 'SELECT * FROM users WHERE username=? and password=?';
        
        ConexionServ.query(consulta, [user.username]).then(function(){
            
        })
        
        if(user.username == 'admin' && user.password == '123'){
            localStorage.logueado = true
            localStorage.user = JSON.stringify(user);
            $state.go('panel')
        }else{
            alert('Datos incorrectos');
        }
        
    }
    
    
})