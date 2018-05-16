angular.module("auditoriaApp")

.controller("LibroMesCtrl", function($scope, ConexionServ, $filter) {

	$scope.entidades 		= true;
    $scope.distrito_new 	= {};
		$scope.modentidades 	= false;
		$scope.verCrearDistrito = false;
		$scope.usuarios 		= [];
	
		$scope.meses = [
			{num: 0, mes: 'Enero'},
			{num: 1, mes: 'Febrero'},
			{num: 3, mes: 'Marzo'},
            {num: 4, mes: 'Abril'},
            {num: 5, mes: 'Mayo'},
            {num: 6, mes: 'Junio'},
            {num: 7, mes: 'Julio'},
            {num: 8, mes: 'Agosto'},
            {num: 9, mes: 'Septiembre'},
            {num: 10, mes: 'Octubre'},
            {num: 11, mes: 'Noviembre'},
            {num: 12, mes: 'Diciembre'}

		];

		$scope.years = [
			{year: 2017},
			{year: 2018},
			{year: 2019},
			{year: 2020},
			{year: 2021},
			{year: 2022},
			{year: 2023},
			{year: 2024},
			{year: 2025},
			{year: 2026},
			{year: 2027},
			{year: 2028},
			{year: 2029},
			{year: 2030},
			{year: 2031},
			{year: 2032},
			{year: 2033},
			{year: 2034},
			{year: 2035},
			{year: 2036},
			{year: 2037},
			{year: 2038},
			{year: 2039},
			{year: 2040},
			{year: 2041},
			{year: 2042},
			{year: 2043},
			{year: 2044},
			{year: 2045},
			{year: 2046},
			{year: 2047},
			{year: 2048},
			{year: 2049},
			{year: 2050},
			{year: 2051},
			{year: 2052},
			{year: 2053},
			{year: 2054},
			{year: 2055},
			{year: 2056},
			{year: 2057},
			{year: 2058},
			{year: 2059},
			{year: 2060}

		];
		
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
		
	



  $scope.crear_libronuevo = function(libro_new) {

  		if (libro_new.mes.length > 1) {
  			alert('Solo puedes seleccionar un mes.');
  			return;
  		}
  		if (libro_new.year.length > 1) {
  			alert('Solo puedes seleccionar un año.');
  			return;
  		}

  		year_temp 	= libro_new.year[0];
  		mes_temp 	= libro_new.mes[0];

		consulta 	= 'INSERT INTO lib_mensuales(year, mes, auditoria_id, diezmos, ofrendas, especiales, remesa_enviada) VALUES(?,?,?,?,?,?,?)';
		
		ConexionServ.query(consulta, [year_temp, mes_temp, $scope.USER.auditoria_id,0,0,0,0]).then(function(result) {
			$scope.traerDatos();
		}, function(tx) {
			console.log("Error no es posbile crear mes", tx);
		});
	};
    $scope.cancelar_crear_distrito = function() {
		$scope.distrito_new 	= {};
		$scope.verCrearDistrito = false;
	};
	
	

	$scope.traerDatos = function(){

		consulta 	= 'SELECT m.*, m.rowid FROM lib_mensuales m';
		
		ConexionServ.query(consulta, []).then(function(result) {
			$scope.lib_meses = result;
		}, function(tx) {
			console.log("Error no es posbile crear mes", tx);
		});


	}



	
   $scope.traerDatos();

   	 $scope.EliminarLibroMensul = function(lib_mensualesEliminate){
	  	
	 	consulta ="DELETE FROM lib_mensuales WHERE rowid=? ";

	   ConexionServ.query(consulta,[lib_mensualesEliminate.rowid]).then(function(result){


           console.log('Libro mes eliminido', result);
           $scope.lib_mensualesEliminates = $filter('filter') ($scope.lib_mensualesEliminates, {rowid: '!' + lib_mensualesEliminate.rowid})
	   } , function(tx){

	   	console.log('Libro mes no se pudo Eliminar' , tx)

	   });

	 }
	 
	 $scope.InsertarMesAño = function(){
   
	};

	
	
  });
