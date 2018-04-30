angular.module('auditoriaApp')

.factory('ConexionServ', function($q, $http, $timeout) {

  var db;


  db = window.openDatabase("AuditFast.db", '1', 'AuditFast', 1024 * 1024 * 49);

  sqlEntidadestas = "CREATE TABLE IF NOT EXISTS entidades (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "alias varchar(100)  DEFAULT NULL collate nocase," +
                "pastor varchar(100)  NOT NULL," +
                "celular date DEFAULT NULL)";

 sqlusuarios = "CREATE TABLE IF NOT EXISTS usuarios (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "apellidos varchar(100)  DEFAULT NULL collate nocase," +
                "sexo varchar(100)  NOT NULL," +
                "username varchar(100)  NOT NULL , " +  
                "password varchar(100)  NOT NULL)" ;

 sqlauditorias = "CREATE TABLE IF NOT EXISTS auditorias (id integer," +
                "fecha varchar(100)  NOT NULL collate nocase," +
                "hora varchar(100)  DEFAULT NULL collate nocase," +
                "entidad varchar(100)  NOT NULL )" 
             ;

 sqlpreguntas = "CREATE TABLE IF NOT EXISTS preguntas (id integer," +
                "definition varchar(100)  NOT NULL collate nocase," +
                "tipo varchar(100)  DEFAULT NULL collate nocase," +
                "option1 varchar(100)  NOT NULL, " +
                "option2 varchar(100)  NOT NULL, " +
                "option3 varchar(100)  NOT NULL, " +
                "option4 varchar(100)  NOT NULL, " +
                "auditoria varchar(100) NOT NULL ) "
                  ;   



sqlrespuestas = "CREATE TABLE IF NOT EXISTS respuestas (id integer," +
                "pregunta_id varchar(100)  NOT NULL collate nocase," +
                "auditoria_id varchar(100)  DEFAULT NULL collate nocase," +
                "respuestas varchar(100)  NOT NULL )" 
             ;       

           



                
    result = {
          
        createTables: function(){
            var defered = $q.defer();
            
            db.transaction(function (tx) {

              console.log(tx);
            
                tx.executeSql(sqlEntidadestas, [], function (tx, result) {
                    console.log('Entidades Tabla creada');
                    defered.resolve('Entidades Tabla creada');
                }, function(tx,error){
                    console.log("Entidades Tabla No se pudo crear", error.message);
                })


                 tx.executeSql( sqlusuarios , [], function (tx, result) {
                    console.log('usuarios Tabla creada');
                    defered.resolve('usuarios Tabla creada');
                }, function(tx,error){
                    console.log("usuarios Tabla No se pudo crear", error.message);
                })

                   tx.executeSql( sqlauditorias , [], function (tx, result) {
                    console.log('auditorias Tabla creada');
                    defered.resolve('auditorias Tabla creada');
                }, function(tx,error){
                    console.log("auditorias Tabla No se pudo crear", error.message);
                })

                    tx.executeSql( sqlpreguntas , [], function (tx, result) {
                    console.log('preguntas Tabla creada');
                    defered.resolve('preguntas Tabla creada');
                }, function(tx,error){
                    console.log("preguntas Tabla No se pudo crear", error.message);
                })


                   tx.executeSql( sqlrespuestas , [], function (tx, result) {
                    console.log('respuestas Tabla creada');
                    defered.resolve('respuestas Tabla creada');
                }, function(tx,error){
                    console.log("respuestas Tabla No se pudo crear", error.message);
                })
          
          
            });
  
        return defered.promise;
        
        },
        query: function(sql, datos, datos_callback){ // datos_callback para los alumnos en for, porque el i cambia
            var defered = $q.defer();
      
            if(typeof datos === "undefined") {
              datos = [];
            }
      
            db.transaction(function (tx) {
              tx.executeSql(sql, datos, function (tx, result) {
                var items = [];
                for (i = 0, l = result.rows.length; i < l; i++) {
                  items.push(result.rows.item(i));
                }
                if (datos_callback) {
                  defered.resolve({items: items, callback: datos_callback});
                }else{
                  defered.resolve(items);
                }
      
                
      
              }, function(tx,error){
                console.log(error.message, sql, datos);
                defered.reject(error.message, datos_callback)
              }) // db.executeSql
            }); // db.transaction
            return defered.promise;
          },
    }
    
    
    return result;

});