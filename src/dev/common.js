module.exports = 
    angular
        .module('cpApp', ['ui.router'])
        .run(function($state) {

        });

require('./index.html');

require('../../node_modules/daterangepicker/daterangepicker.css');

require('./style.sass');

require('./main/main.controller');

require('./routing.config');
