module.exports = 
    angular
        .module('cpApp')
        .controller('mainController', ['$state', '$rootScope', '$scope', mainController])

function mainController($state, $rootScope, $scope) {

 

  var $ = require('jquery');

    var vm = this;
        vm.test = 'Welcome to DateRangePicker!';
        vm.timeStamps = [];

    setTimeout(() => {

        initDatepicker('range', false);

    }, 300)

    function initDatepicker(id, exist) {

                require('daterangepicker');

            $(`#${id}`).daterangepicker({
                startDate: new Date(),
                autoUpdateInput: true,
            }, () => {
                console.log("Successfully iitialized.");
            });


            $(`#${id}`).on('apply.daterangepicker', function (event, picker) {
                console.log(event, picker);
                vm.timeStamps.push({
                    start: picker.startDate._d,
                    end: picker.endDate._d
                });
                $scope.$apply();
            });
    }

}