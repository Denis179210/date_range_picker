module.exports = 
    angular
        .module('cpApp')
        .config(['$stateProvider', '$locationProvider',
            function($stateProvider, $locationProvider) {
                
            $stateProvider
                .state({
                    name: 'main',
                    url: '/',
                    template: require('./main/main.html'),
                })
                
                $locationProvider.html5Mode(true); 
            }]);