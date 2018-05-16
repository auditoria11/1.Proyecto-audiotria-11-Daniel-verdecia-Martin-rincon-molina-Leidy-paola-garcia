angular.module('auditoriaApp')


.controller('LoginCtrl', function($scope, $state, ConexionServ, AuthServ){
    
    $scope.user = {}
    
    
    
    $scope.entrar = function(user){
        
        
        AuthServ.loguear(user).then(function(){
            $state.go('panel')
        }, function(){
            alert('Datos incorrectos');
        })
    
        
    }
    
    
    
    ConexionServ.createTables();
	
    $scope.insertar_datos_iniciales = function() {
		
    	consulta = "SELECT * from usuarios ";
   		ConexionServ.query(consulta, []).then(function(result) {
			if (result.length == 0) {
				
				consulta = "INSERT INTO usuarios(nombres, apellidos, username, password, tipo, sexo) VALUES(?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['JORGE', 'CELEDON', 'jorge',  '123', 'Pastor', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['JUAN CAMILO', 'MANRRIQUE', 'juan',  '123', 'Tesorero', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['DANIEL', 'GRANDAS', 'daniel',  '123', 'Pastor', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['EDILSON', 'MARQUEZ', 'edilson',  '123', 'Tesorero', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['FELIX', 'DÍAZ', 'felix',  '123', 'Pastor', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				
				
				// Distritos
				
				consulta = "INSERT INTO distritos(nombre, alias, zona, pastor_id) VALUES(?,?,?,?) ";
				ConexionServ.query(consulta, ['TAME ORIENTAL', 'TAM-ORI', 'TAME',  1]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['TAME CENTRAL', 'TAM-CEN', 'TAME',  3]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['EMMANUEL TAME', 'EMM-TAME', 'TAME',  5]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				
				// Iglesias
				
				consulta = "INSERT INTO iglesias(nombre, alias, distrito_id) VALUES(?,?,?) ";
				ConexionServ.query(consulta, ['EMAUS', 'EMAUS', 2]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['HEBRÓN', 'HEBRÓN', 2]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['LAS BRISAS DE SATENA', 'BRISAS', 2]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['EMMANUEL', 'EMMANUEL', 3]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['EFESO', 'EFESO', 1]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['EBENEZER', 'EBENEZER', 1]).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});



				
				// AUDITORIAS
				consulta = "INSERT INTO auditorias(fecha, hora, iglesia_id) VALUES(?,?,?) ";
				ConexionServ.query(consulta, ['01/01/2015', '10:10:00am', 1]).then(function(result) {
					console.log('Audi prueba insertada');
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				
			}
			
        }, function(tx) {
          console.log("", tx);
		});
		
	};
	
	$scope.insertar_datos_iniciales();
	
	
    
})