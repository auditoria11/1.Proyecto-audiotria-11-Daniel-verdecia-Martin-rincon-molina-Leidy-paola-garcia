angular.module("auditoriaApp")

.controller('SeleccionarDistritoModalCtrl', function ($uibModalInstance, ConexionServ, $scope, USER, AuthServ) {
	
	$scope.USER 		= USER;
	$scope.distritos 	= [];
		
	ConexionServ.query('SELECT *, rowid FROM distritos', []).then(function(result) {
		
		$scope.distritos = result;
		
		for (let i = 0; i < $scope.distritos.length; i++) {
			
			ConexionServ.query('SELECT *, rowid FROM iglesias WHERE distrito_id=?', [$scope.distritos[i].rowid]).then(function(result) {
			
				$scope.distritos[i].iglesias = result;
				
			}, function(tx) {
				console.log("Error no es posbile traer Distritos", tx);
			});
			
		}
		
		
	}, function(tx) {
		console.log("Error no es posbile traer Distritos", tx);
	});
	
	$scope.seleccionarIglesia = function(iglesia) {
		ConexionServ.query('UPDATE usuarios SET distrito_id=?, iglesia_id=? WHERE rowid=? ', [ iglesia.distrito_id, iglesia.rowid, $scope.USER.rowid ]).then(function(result) {
			$scope.USER.iglesia_id 		= iglesia.rowid;
			$scope.USER.distrito_id 	= iglesia.distrito_id;
			
			AuthServ.update_user_storage($scope.USER).then(function(usuario){
				$uibModalInstance.close(usuario);
			});
			
			
		});
	}

	$scope.ok = function () {
		$uibModalInstance.dismis('Sin nada');
	};
  
});
  