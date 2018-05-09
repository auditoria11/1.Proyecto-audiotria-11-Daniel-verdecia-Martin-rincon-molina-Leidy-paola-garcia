angular.module('auditoriaApp', [
	'ngSanitize', 
	'ngTouch',
	'ngAnimate',
	'ui.router', 
	'ui.bootstrap',
	'ui.select'
])

.config(function($stateProvider, $urlRouterProvider, uiSelectConfig){
	
	
	uiSelectConfig.theme = 'select2'
	uiSelectConfig.resetSearchInput = true
	

	$stateProvider

	.state('panel', {
		url: '/panel',
		controller: 'PanelCtrl',
		templateUrl: 'templates/panel.html'
	})

	.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'templates/login.html'
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