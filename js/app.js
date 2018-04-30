angular.module('auditoriaApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){

	$stateProvider

	.state('panel', {
		url: '/panel',
		templateUrl: 'templates/panel.html'
	})

	.state('panel.entidades', {
		url: '/entidades',
		controller: 'EntidadesCtrl',
		templateUrl: 'templates/entidades.html'
	})

	.state('panel.usuarios', {
		url: '/usuarios',
		controller: 'usuariosctrl',
		templateUrl: 'templates/usuarios.html'
	})

	.state('panel.auditorias', {
		url: '/auditorias',
		controller: 'auditoriasctrl',
		templateUrl: 'templates/auditorias.html'
	})

	.state('panel.preguntas', {
		url: '/preguntas',
		controller: 'preguntasctrl',
		templateUrl: 'templates/preguntas.html'
	})

	.state('panel.respuestas', {
		url: '/respuestas',
		controller: 'respuestasctrl',
		templateUrl: 'templates/respuestas.html'
	})


	$urlRouterProvider.otherwise('/panel');

})