var dota2base = angular.module('dota2base', ['ngRoute']);

dota2base.controller('Dota2BaseController', ['$http', '$scope', function($http, $scope){
	
	
	$scope.enterId = function (){
		$scope.input = document.getElementById('account_id').value
	$http({
		method : 'GET',
		url : 'https://api.opendota.com/api/players/' + $scope.input + '/',
		params: {
			'api_key' : '69B492013F129DACE0A69324CBCA87C1'
		}
	}).then(function success(response){

		$scope.data = response.data;
		$scope.profile = response.data.profile;
		console.log(response.data);
		


	}, function failed(response) {
		alert('Bad request!');
	})


	$http({
		method: 'GET',
		url: 'https://api.opendota.com/api/players/' + $scope.input +'/recentmatches',
		params: {
			'api_key': '69B492013F129DACE0A69324CBCA87C1',
			'limit' : 10
		}
	}).then(function success(response){
		$scope.matches = response.data;
		// console.log($scope.matches);
		for (let i = 0; i < response.data.length; i++){
			$scope.matches[i].duration = Math.ceil($scope.matches[i].duration / 60) + ':' + Math.ceil($scope.matches[i].duration % 60);
			if ($scope.matches[i].game_mode == '0') {
				$scope.matches[i].game_mode = 'No Game Mode';
			} else if ($scope.matches[i].game_mode == '1') {
				$scope.matches[i].game_mode = 'All Pick';
			} else if ($scope.matches[i].game_mode == '2') {
				$scope.matches[i].game_mode = "Captain's Mode";
			} else if ($scope.matches[i].game_mode == '3') {
				$scope.matches[i].game_mode = 'Random Draft';
			} else if ($scope.matches[i].game_mode == '4') {
				$scope.matches[i].game_mode = 'Single Draft';
			} else if ($scope.matches[i].game_mode == '5') {
				$scope.matches[i].game_mode = 'All Random';
			} else if ($scope.matches[i].game_mode == '6') {
				$scope.matches[i].game_mode = 'Intro';
			} else if ($scope.matches[i].game_mode == '7') {
				$scope.matches[i].game_mode = "Diretide";
			} else if ($scope.matches[i].game_mode == '8') {
				$scope.matches[i].game_mode = "Reverse Captain's Mode";
			} else if ($scope.matches[i].game_mode == '9') {
				$scope.matches[i].game_mode = 'Greeviling';
			} else if ($scope.matches[i].game_mode == '10') {
				$scope.matches[i].game_mode = 'Tutorial';
			} else if ($scope.matches[i].game_mode == '11') {
				$scope.matches[i].game_mode = 'Mid Only';
			} else if ($scope.matches[i].game_mode == '12') {
				$scope.matches[i].game_mode = 'Least Played';
			} else if ($scope.matches[i].game_mode == '13') {
				$scope.matches[i].game_mode = 'New Player Pool';
			} else if ($scope.matches[i].game_mode == '14') {
				$scope.matches[i].game_mode = 'Compendium Matchmaking';
			} else if ($scope.matches[i].game_mode == '15') {
				$scope.matches[i].game_mode = "Custom";
			} else if ($scope.matches[i].game_mode == '16') {
				$scope.matches[i].game_mode = "Captain's Draft";
			} else if ($scope.matches[i].game_mode == '17') {
				$scope.matches[i].game_mode = 'Balanced Draft';
			} else if ($scope.matches[i].game_mode == '18') {
				$scope.matches[i].game_mode = 'Ability Draft';
			} else if ($scope.matches[i].game_mode == '19') {
				$scope.matches[i].game_mode = 'Custom Game';
			} else if ($scope.matches[i].game_mode == '20') {
				$scope.matches[i].game_mode = 'All Random Deathmatch';
			} else if ($scope.matches[i].game_mode == '21') {
				$scope.matches[i].game_mode = 'Solo Mid 1v1';
			} else if ($scope.matches[i].game_mode == '22') {
				$scope.matches[i].game_mode = 'Ranked All Pick';
			}
			else if ($scope.matches[i].game_mode == '23') {
				$scope.matches[i].game_mode = 'Turbo';
			} 
		};
		$http({
			method: 'GET',
			url: '../assets/heroes.json'
		}).then(function success(heroes){
			// console.log(JSON.stringify(heroes.data));
			$scope.hero = heroes.data;
			for(let k = 0; k < response.data.length; k++){
				for (n = 0; n < heroes.data.length; n++){
					if ($scope.matches[k].hero_id == $scope.hero[n].id) {
						$scope.matches[k].hero_id = $scope.hero[n].localized_name;
						$scope.matches[k].url = $scope.hero[n].url;
						// console.log($scope.matches);
					}
				}
			}
			$http({
				method: 'GET',
				url: 'https://api.opendota.com/api/players/' + $scope.input + '/heroes',
				params: {
					'api_key': '69B492013F129DACE0A69324CBCA87C1'
				}
			}).then(function(bestHeroes){
				$scope.bestHero = bestHeroes.data;
				console.log($scope.bestHero)
				for(let f = 0; f < bestHeroes.data.length; f++){
					for(let n = 0; n < heroes.data.length; n++){
						if($scope.bestHero[f].hero_id == $scope.hero[n].id){
							$scope.bestHero[f].hero_id = $scope.hero[n].localized_name;
							$scope.bestHero[f].url = $scope.hero[n].url;
							$scope.bestHero[f].win_rate = ($scope.bestHero[f].win / $scope.bestHero[f].games) * 100 + '%';

						}
					}
				}
	
				}, function failed(bestHeroes){

			})
			
		}, function failed(heroes){

		})


	}, function failed(response){

	})
}
	
	}
])












