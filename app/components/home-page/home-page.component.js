angular.module('homePage').component('homePage', {
    templateUrl: 'app/components/home-page/home-page.template.html',
    controller: ['$http', '$scope', function HomePageController($http, $scope){


    	(function($){
		  $(function() {
		    $('.menu__icon').on('click', function() {
		      $(this).closest('.menu').toggleClass('menu_state_open');
		    });
		  });
		})(jQuery);
    	
    }]
})