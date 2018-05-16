angular.module("auditoriaApp")

.controller("EntidadesCtrl", function($scope, ConexionServ, $filter) {
    $scope.entidades 		= true;
    $scope.distrito_new 	= {};
		$scope.modentidades 	= false;
		$scope.verCrearDistrito = false;
		$scope.usuarios 		= [];
	
		
		
		$scope.gridOptions = {
			enableSorting: true,
			enableFiltering: true,
			columnDefs: [
				{ field: 'nombre' },
				{ field: 'alias' },
				{ field: 'celular' },
				{ field: 'tesorero_nombres' }
			],
			onRegisterApi: function( gridApi ) {
				$scope.grid1Api = gridApi;
			}
		};
		
	
  $scope.crear_distrito = function() {
		$scope.verCrearDistrito = !$scope.verCrearDistrito;
	};
    $scope.cancelar_crear_distrito = function() {
		$scope.distrito_new 	= {};
		$scope.verCrearDistrito = false;
	};
	
	$scope.insertar_distrito = function (distrito) {
		console.log(distrito);
		$scope.pastor_new_id 	= null;
		$scope.tesorero_new_id 	= null;
		
		if (distrito.pastor) {
			if (distrito.pastor.rowid) {
				$scope.pastor_new_id = distrito.pastor.rowid;
			}
		}
		
		if (distrito.tesorero) {
			if (distrito.tesorero.rowid) {
				$scope.tesorero_new_id = distrito.tesorero.rowid;
			}
		}
		
		consulta = 'INSERT INTO distritos(nombre, alias, zona, pastor_id, tesorero_id) VALUES(?,?,?,?,?)';
		
		ConexionServ.query(consulta, [distrito.nombre, distrito.alias, distrito.zona, $scope.pastor_new_id, $scope.tesorero_new_id]).then(function(result) {
			$scope.traerDatos();
		}, function(tx) {
			console.log("Error no es posbile traer Distritos", tx);
		});
		
	}
	  
	  

    $scope.crearI = function() {
      $scope.vercrear = !$scope.vercrear;
    };


    $scope.modentidad = function(entidad) {
      $scope.modentidades = !$scope.modentidades;

      $scope.entidad_editar = entidad;
    };

	
	
	// Traemos todos los datos que necesito para trabajar
    $scope.traerDatos = function() {

		// Traemos USUARIOS
		consulta = "SELECT rowid, nombres, apellidos, sexo, tipo, celular, username from usuarios";

		ConexionServ.query(consulta, []).then(function(result) {
			$scope.usuarios = result;
			console.log(result);

		}, function(tx) {
			console.log("Error no es posbile traer usuarios", tx);
		});
		
		// Traemos IGLESIAS
		consulta = "SELECT i.rowid, i.nombre, i.alias, i.distrito_id, i.tesorero_id, i.secretario_id, "+
					"t.nombres as tesorero_nombres, t.apellidos as tesorero_apellidos " +
				"from iglesias i "+
				"LEFT JOIN usuarios t ON t.tipo='Tesorero' and t.rowid=i.tesorero_id "+
				"LEFT JOIN usuarios s ON s.tipo='Secretario' and s.rowid=i.secretario_id ";

		ConexionServ.query(consulta, []).then(function(result) {
			$scope.iglesias = result;
			$scope.gridOptions.data = result;
		}, function(tx) {
			console.log("Error no es posbile traer usuarios", tx);
		});
		
		// Traemos DISTRITOS
		consulta = "SELECT d.rowid, d.nombre, d.alias, d.pastor_id, d.tesorero_id, "+
					"p.nombres as pastor_nombres, p.apellidos as pastor_apellidos "+
				"from distritos d " + 
	  			"INNER JOIN usuarios p ON p.tipo='Pastor' and p.rowid=d.pastor_id";

    	ConexionServ.query(consulta, []).then(function(result) {
          $scope.distritos = result;
        }, function(tx) {
          console.log("Error no es posbile traer Iglesias", tx);
        });
    };

	$scope.traerDatos();
	
	
	

    $scope.Insertentidad = function(entidad_crear) {
    	consulta = "INSERT INTO entidades(nombres, alias, pastor, celular) VALUES(?, ?, ?, ?) ";
		ConexionServ.query(consulta, [ entidad_crear.nombres, entidad_crear.alias, entidad_crear.pastor, entidad_crear.celular ]).then(function(result) {
          console.log("entidad creada", result);
		  alert("Entidad creada exitosamente");
		  
        }, function(tx) {
          console.log("entidad no se pudo crear", tx);
        }
      );
    };

    $scope.actuentidad = function(entidad_cambiar) {
      consulta =
        "UPDATE  entidades SET nombres=?, alias=?, pastor=?, celular=? WHERE rowid=? ";
      ConexionServ.query(consulta, [
        entidad_cambiar.nombres,
        entidad_cambiar.alias,
        entidad_cambiar.pastor,
        entidad_cambiar.celular,
        entidad_cambiar.rowid
      ]).then(
        function(result) {
          console.log("entidad Actualizada", result);
        },
        function(tx) {
          console.log("entidad no se pudo actualizar", tx);
        }
      );
    };

    $scope.eliminarentidad = function(entidad) {
      consulta = "DELETE FROM entidades WHERE rowid=? ";

      ConexionServ.query(consulta, [entidad.rowid]).then(
        function(result) {
          console.log("entidad eliminida", result);
          $scope.entidades = $filter("filter")($scope.entidades, {
            rowid: "!" + entidad.rowid
          });
        },
        function(tx) {
          console.log("Entidad no se pudo Eliminar", tx);
        }
      );
    };

	
	
    $scope.insertar_datos_iniciales = function() {
		
    	consulta = "SELECT * from usuarios ";
   		ConexionServ.query(consulta, []).then(function(result) {
			if (result.length == 0) {
				
				// USUARIOS
				consulta = "INSERT INTO usuarios(nombres, apellidos, username, password, tipo, sexo) VALUES(?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['JORGE', 'CELEDON', 'jorge',  123, 'Pastor', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['JUAN CAMILO', 'MANRRIQUE', 'juan',  123, 'Tesorero', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['DANIEL', 'GRANDAS', 'daniel',  123, 'Pastor', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['EDILSON', 'MARQUEZ', 'edilson',  123, 'Tesorero', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['FELIX', 'DÍAZ', 'felix',  123, 'Pastor', 'M']).then(function(result) {
		
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
				

			}
			
        }, function(tx) {
          console.log("", tx);
		});
		
	};
	
	$scope.insertar_datos_iniciales();
	
	
  });
