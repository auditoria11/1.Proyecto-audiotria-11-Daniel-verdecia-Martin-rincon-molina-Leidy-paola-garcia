angular.module('auditoriaApp')

.controller('auditoriasctrl' , function($scope, ConexionServ, $filter){


	$scope.vercrearauditorias = function(){

		$scope.vermostrandocrarauditorias = !$scope.vermostrandocrarauditorias

		
	}

 

   $scope.veractuauditoria = function(auditoria){


   	$scope.modusers = !$scope.modusers

   	 
		
		$scope.auditoria_editars = auditoria;
	}

	ConexionServ.createTables();


	 $scope.Insertentidadauditoria = function(auditoria_crear){

	 	auditoria_crear.fecha = new Date();
		auditoria_crear.fecha = ' ' + auditoria_crear.fecha.getFullYear() + ' / ' + auditoria_crear.fecha.getMonth() + ' / ' + auditoria_crear.fecha.getDate() ;

		auditoria_crear.hora = new Date();
		auditoria_crear.hora = ' ' + auditoria_crear.hora.getHours() + ' : ' + auditoria_crear.hora.getMinutes() + ' : ' + auditoria_crear.hora.getSeconds() ;
	  	


	 	consulta ="INSERT INTO auditorias(fecha, hora, entidad) VALUES(?, ?, ?) "
	   ConexionServ.query(consulta,[auditoria_crear.fecha, auditoria_crear.hora, auditoria_crear.entidad]).then(function(result){

           console.log('Auditoria creada', result)
           alert('Auditoria creada exitosamente')

	   } , function(tx){

	   	console.log('Auditoria no se pudo crear' , tx)

	   });


	 } 

	 $scope.vermostrarauditoriastabla = function(){


	   
	   ConexionServ.query('SELECT  a.*, a.rowid, e.nombres, e.alias  from auditorias a INNER JOIN entidades e ON a.entidad = e.rowid  ', []).then(function(result){

	          $scope.auditorias = result;

			   

				  
                      

		


		   } , function(tx){

		   	console.log('Error no es posbile traer auditorias' , tx)

		   })




	    ConexionServ.query('SELECT *, rowid from entidades', []).then(function(result){

	          $scope.entidades = result;

		   } , function(tx){

		   	console.log('Error no es posbile traer Entidades' , tx)

		   });
	 



	 } 



  
	 $scope.vermostrarauditoriastabla();



	


	 $scope.actusersauditoria = function(auditoria_cambiar){


	 	auditoria_cambiar.fecha = new Date();
		auditoria_cambiar.fecha = ' ' + auditoria_cambiar.fecha.getFullYear() + ' / ' + auditoria_cambiar.fecha.getMonth() + ' / ' + auditoria_cambiar.fecha.getDate() ;

		auditoria_cambiar.hora = new Date();
		auditoria_cambiar.hora = ' ' + auditoria_cambiar.hora.getHours() + ' : ' + auditoria_cambiar.hora.getMinutes() + ' : ' + auditoria_cambiar.hora.getSeconds() ;
	  	
	 consulta ="UPDATE  auditorias SET fecha=?, hora=?, entidad=? WHERE rowid=? "
	   ConexionServ.query(consulta,[auditoria_cambiar.fecha, auditoria_cambiar.hora, auditoria_cambiar.entidad,  auditoria_cambiar.rowid]).then(function(result){

           console.log('auditoria  Actualizado', result)
           alert('auditoria actualizado correctamente presione F5 para recargar')

	   } , function(tx){

	   	console.log('auditoria no se pudo actualizar' , tx)

	   });

	 } 




	 $scope.elimninaradutiroiar = function(auditoria){
	  	
	 	consulta ="DELETE FROM auditorias WHERE rowid=? ";

	   ConexionServ.query(consulta,[auditoria.rowid]).then(function(result){


           console.log('auditoria eliminido', result);
           $scope.auditorias = $filter('filter') ($scope.auditorias, {rowid: '!' + auditoria.rowid})
	   } , function(tx){

	   	console.log('auditoria no se pudo Eliminar' , tx)

	   });

	 } 




});


