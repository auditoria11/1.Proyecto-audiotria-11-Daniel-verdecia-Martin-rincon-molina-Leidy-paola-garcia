angular.module('auditoriaApp')

.factory('ConexionServ', function($q, $http, $timeout) {

    var db;


    db = window.openDatabase("AuditFast.db", '1', 'AuditFast', 1024 * 1024 * 49);

    sqlDistritos = "CREATE TABLE IF NOT EXISTS distritos (id integer," +
                "nombre varchar(200)  NOT NULL collate nocase," +
                "alias varchar(100)  DEFAULT NULL collate nocase," +
                "zona varchar(100)  DEFAULT NULL collate nocase," +
                "pastor_id integer DEFAULT NULL," +
                "tesorero_id integer DEFAULT NULL)"; // Tesorero del distrito

   sqlIglesias = "CREATE TABLE IF NOT EXISTS iglesias (id integer," +
                "nombre varchar(200)  NOT NULL collate nocase," +
                "alias varchar(100)  DEFAULT NULL collate nocase," +
                "distrito_id integer DEFAULT NULL," +
                "tesorero_id integer DEFAULT NULL," + // Tesorero de la iglesia
                "secretario_id integer DEFAULT NULL)";

    sqlusuarios = "CREATE TABLE IF NOT EXISTS usuarios (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "apellidos varchar(100)  DEFAULT NULL collate nocase," +
                "sexo varchar(100)  NOT NULL," +
                "tipo varchar(100)  NOT NULL," + // Auditor, Pastor, Tesorero
                "distrito_id integer DEFAULT NULL," +
                "iglesia_id integer DEFAULT NULL," +
                "auditoria_id integer DEFAULT NULL," +
                "celular varchar(100)  NULL," +
                "username varchar(100)  NOT NULL , " +  
                "password varchar(100)  NOT NULL)" ;

    sqlauditorias = "CREATE TABLE IF NOT EXISTS auditorias (id integer," +
                "fecha varchar(100)  DEFAULT NULL collate nocase," +
                "hora varchar(100)  DEFAULT NULL collate nocase," +
                "saldo_ant integer  DEFAULT NULL," +
                "iglesia_id integer  NOT NULL )" ;

    sqlLibMes = "CREATE TABLE IF NOT EXISTS lib_mensuales (id integer," +
                "year integer  NOT NULL," +
                "mes varchar(100)  NOT NULL collate nocase," +
                "orden integer  DEFAULT NULL," +
                "auditoria_id integer  NOT NULL," +
                "diezmos integer  DEFAULT NULL ," +
                "ofrendas integer  DEFAULT NULL ," +
                "especiales integer  DEFAULT NULL ," + 
                "remesa_enviada integer  DEFAULT NULL )";

    // Dinero recogido en los 5 o 4 sábados del mes. Puede especificar por sábado o por total
    sqlLibSem = "CREATE TABLE IF NOT EXISTS lib_semanales (id integer," +
                "libro_mes_id integer  NOT NULL," +
                "diezmo_1 integer DEFAULT NULL," + // Diezmos recogidos el primer sábado del mes
                "ofrenda_1 integer  DEFAULT NULL ," + // Ofrendas recogidas el primer sábado del mes
                "especial_1 integer  DEFAULT NULL ," +  // Ofrendas especiales recogidas el primer sábado del mes
                "diezmo_2 integer DEFAULT NULL," + // Diezmos recogidos el SEGUNDO sábado del mes
                "ofrenda_2 integer  DEFAULT NULL ," +
                "especial_2 integer  DEFAULT NULL ," + 
                "diezmo_3 integer DEFAULT NULL," + // Diezmos recogidos el TERCERO sábado del mes
                "ofrenda_3 integer  DEFAULT NULL ," +
                "especial_3 integer  DEFAULT NULL ," + 
                "diezmo_4 integer DEFAULT NULL," + // Diezmos recogidos el CUARTO sábado del mes
                "ofrenda_4 integer  DEFAULT NULL ," +
                "especial_4 integer  DEFAULT NULL ," + 
                "diezmo_5 integer DEFAULT NULL," + // Diezmos recogidos el QUINTO sábado del mes
                "ofrenda_5 integer  DEFAULT NULL ," +
                "especial_5 integer  DEFAULT NULL ," + 
                "total_diezmos integer  DEFAULT NULL ," +  // Diezmos recogidos del mes, no por sábados
                "total_ofrendas integer  DEFAULT NULL ," +  // Ofrendas recogidas del mes, no por sábados
                "total_especiales integer  DEFAULT NULL ," +  // Ofrendas especiales recogidas del mes, no por sábados
                "por_total integer  DEFAULT NULL )"; // 0 o 1. Si es por total, se ignoran los valores de los 5 sábados

    // Obligaciones fijas que tiene la iglesia mensuales
    sqlDestinos = "CREATE TABLE IF NOT EXISTS destinos (id integer," +
                "iglesia_id integer  NOT NULL," +
                "nombre varchar(250)  NOT NULL collate nocase," +
                "descripcion varchar(250)  DEFAULT NULL collate nocase )";


    // Pagos que ha hecho la iglesia en ese mes en los destinos fijos
    sqlPagosDest = "CREATE TABLE IF NOT EXISTS destinos_pagos (id integer," +
                "destino_id integer  NOT NULL," +
                "libro_mes_id integer  NOT NULL," +
                "pago integer  NOT NULL," +
                "fecha varchar(100)  DEFAULT NULL collate nocase," +
                "descripcion varchar(250)  DEFAULT NULL collate nocase )";

    
    // Sumatorias de las facturas que tiene la iglesia por mes
    sqlSoportesMes = "CREATE TABLE IF NOT EXISTS soportes_mes (id integer," +
                "libro_mes_id integer  NOT NULL," +
                "valor integer  NOT NULL," +
                "descripcion varchar(250)  DEFAULT NULL collate nocase )";

    // Gastos registrados. Tiene que coincidir con los gastos que tienen soporte en soportes_mes
    sqlGatosMes = "CREATE TABLE IF NOT EXISTS gastos_mes (id integer," +
                "libro_mes_id integer  NOT NULL," +
                "valor integer  NOT NULL," +
                "descripcion varchar(250)  DEFAULT NULL collate nocase )";

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
                
                tx.executeSql(sqlDistritos, [], function (tx, result) {
                    // console.log('Distritos Tabla creada');
                    defered.resolve('Distritos Tabla creada');
                }, function(tx,error){
                    console.log("Distritos Tabla No se pudo crear", error.message);
                })
                
                tx.executeSql(sqlIglesias, [], function (tx, result) {
                    // console.log('Iglesias Tabla creada');
                    defered.resolve('Iglesias Tabla creada');
                }, function(tx,error){
                    console.log("Iglesias Tabla No se pudo crear", error.message);
                })


                 tx.executeSql( sqlusuarios , [], function (tx, result) {
                    // console.log('usuarios Tabla creada');
                    defered.resolve('usuarios Tabla creada');
                }, function(tx,error){
                    console.log("usuarios Tabla No se pudo crear", error.message);
                })

                tx.executeSql( sqlauditorias , [], function (tx, result) {
                    // console.log('auditorias Tabla creada');
                    defered.resolve('auditorias Tabla creada');
                }, function(tx,error){
                    console.log("auditorias Tabla No se pudo crear", error.message);
                })


                tx.executeSql( sqlLibMes , [], function (tx, result) {
                    // console.log('Libros mensuales Tabla creada');
                    defered.resolve('Libros mensuales Tabla creada');
                }, function(tx,error){
                    console.log("Libros mensuales Tabla No se pudo crear", error.message);
                })

                tx.executeSql( sqlLibSem , [], function (tx, result) {
                    // console.log('Libros Semanales Tabla creada');
                    defered.resolve('Libros Semanales Tabla creada');
                }, function(tx,error){
                    console.log("Libros Semanales Tabla No se pudo crear", error.message);
                })

                tx.executeSql( sqlDestinos , [], function (tx, result) {
                    console.log('Destinos Tabla creada');
                    defered.resolve('Destinos Tabla creada');
                }, function(tx,error){
                    console.log("Destinos Tabla No se pudo crear", error.message);
                })

                tx.executeSql( sqlPagosDest , [], function (tx, result) {
                    // console.log('Pagos Destinos Tabla creada');
                    defered.resolve('Pagos Destinos Tabla creada');
                }, function(tx,error){
                    console.log("Pagos Destinos Tabla No se pudo crear", error.message);
                })

                tx.executeSql( sqlSoportesMes , [], function (tx, result) {
                    // console.log('Soportes Mes Tabla creada');
                    defered.resolve('Soportes Mes Tabla creada');
                }, function(tx,error){
                    console.log("Soportes Mes Tabla No se pudo crear", error.message);
                })


                tx.executeSql( sqlGatosMes , [], function (tx, result) {
                    // console.log('Gastos Mes Tabla creada');
                    defered.resolve('Gastos Mes Tabla creada');
                }, function(tx,error){
                    console.log("Gastos Mes Tabla No se pudo crear", error.message);
                })

                tx.executeSql( sqlpreguntas , [], function (tx, result) {
                    // console.log('preguntas Tabla creada');
                    defered.resolve('preguntas Tabla creada');
                }, function(tx,error){
                    console.log("preguntas Tabla No se pudo crear", error.message);
                })


                   tx.executeSql( sqlrespuestas , [], function (tx, result) {
                    // console.log('respuestas Tabla creada');
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