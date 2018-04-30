angular.module('auditoriaApp')

.controller('EntidadesCtrl' , function($scope, ConexionServ, $filter){


$scope.entidades = true; 
$scope.modentidades = false; 
 

 ConexionServ.createTables();


$scope.crearI = function(){
	$scope.vercrear = !$scope.vercrear;
}


$scope.modentidad = function(entidad){
	       
      $scope.modentidades = !$scope.modentidades;

      $scope.entidad_editar = entidad;

     

}



	 $scope.vertablaentidadesmostrear = function(){
	   
	   ConexionServ.query('SELECT rowid , nombres, alias, pastor, celular from entidades', []).then(function(result){

	          $scope.entidades = result;

		   } , function(tx){

		   	console.log('Error no es posbile traer Entidades' , tx)

		   })
	 } 

	 $scope.vertablaentidadesmostrear();


  $scope.Insertentidad = function(entidad_crear){
	  	
	 	consulta ="INSERT INTO entidades(nombres, alias, pastor, celular) VALUES(?, ?, ?, ?) "
	   ConexionServ.query(consulta,[entidad_crear.nombres, entidad_crear.alias, entidad_crear.pastor, entidad_crear.celular]).then(function(result){
           
           console.log('entidad creada', result)
           alert('Entidad creada exitosamente')

	   } , function(tx){

	   	console.log('entidad no se pudo crear' , tx)

	   });

	 } 


  $scope.actuentidad = function(entidad_cambiar){
	  	
	 consulta ="UPDATE  entidades SET nombres=?, alias=?, pastor=?, celular=? WHERE rowid=? "
	   ConexionServ.query(consulta,[entidad_cambiar.nombres, entidad_cambiar.alias, entidad_cambiar.pastor, entidad_cambiar.celular, entidad_cambiar.rowid]).then(function(result){

           console.log('entidad Actualizada', result)

	   } , function(tx){

	   	console.log('entidad no se pudo actualizar' , tx)

	   });

	 } 

 $scope.eliminarentidad = function(entidad){
	  	
	 	consulta ="DELETE FROM entidades WHERE rowid=? ";

	   ConexionServ.query(consulta,[entidad.rowid]).then(function(result){


           console.log('entidad eliminida', result);
           $scope.entidades = $filter('filter') ($scope.entidades, {rowid: '!' + entidad.rowid})
	   } , function(tx){

	   	console.log('Entidad no se pudo Eliminar' , tx)

	   });

	 } 


   

});