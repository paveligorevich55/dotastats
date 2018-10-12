angular.module('profilePage').component('profilePage', {
	templateUrl: 'app/components/profile-page/profile-page.template.html',
    controller: ['$http', '$scope', function ProfilePageController($http, $scope){

    	var account_id = 131389547;
    	var api_key = '706700BD62A6A2A65A14C30E3D1A7260';
    	

    	
	$http({
		method : 'GET',
		url : 'https://api.opendota.com/api/players/' + account_id + '/',
		params: {
			'api_key' : api_key
		}
	}).then(function success(response){

		$scope.data = response.data;
		$scope.profile = response.data.profile;
		console.log(response.data);
		$scope.rank = response.data.rank_tier;
		
		$http({
			method: 'GET',
			url: '../assets/medal.json'
		}).then(function(ranks){
			$scope.medal = ranks.data;
			console.log($scope.rank);
			console.log($scope.medal);
			console.log($scope.medal.ranks.length);
			for(let rk = 0; rk < ranks.data.ranks.length; rk++){
				if($scope.rank == $scope.medal.ranks[rk].id){
					$scope.rank = $scope.medal.ranks[rk].image;
					console.log($scope.rank);
				}

			};
			for(let cls = 0; cls < $scope.matches.length; cls++){
		        if($scope.matches[cls].result === 'Win Match'){
		            $(".span-winlose").eq(cls).css("color", "green");
		        } else if($scope.matches[cls].result === 'Lost Match'){
		            $(".span-winlose").eq(cls).css("color", "red");
		        }
		    };
			
		}, function(ranks){

		})
		
		$http({
			method : 'GET',
			url : 'https://api.opendota.com/api/players/' + account_id + '/peers',
			params: {
				'api_key' : api_key
			}
    	}).then(function(profilepeers){
    		$scope.profilepeer = profilepeers.data;
    		for(let peer = 0; peer < $scope.profilepeer.length; peer++){
    			$scope.profilepeer[peer] = Object.assign($scope.profilepeer[peer],{
    				moment_ago: ''
    			})
    			$scope.profilepeer[peer].moment_ago = moment( $scope.profilepeer[peer].last_played * 1000).startOf('day').fromNow();
    			$scope.profilepeer[peer].win_rate_peer = ($scope.profilepeer[peer].with_win / $scope.profilepeer[peer].with_games)*100;
    		};
    		
    		console.log($scope.profilepeer);
    	}, function(profilepeer){

    	});


	}, function failed(response) {
		alert('Bad request!');
	})




	$http({
		method : 'GET',
		url : 'https://api.opendota.com/api/players/' + account_id + '/wl',
		params: {
			'api_key' : api_key
		}
	}).then(function success(winlose){

		$scope.stats = winlose.data;
		console.log(winlose);
		$scope.winrate = ($scope.stats.win / ($scope.stats.win + $scope.stats.lose))*100;
		


	}, function failed(winlose) {
		alert('Bad request!');
	})

	

	$http({
		method: 'GET',
		url: 'https://api.opendota.com/api/players/' + account_id +'/recentmatches',
		params: {
			'api_key': api_key
		}
	}).then(function success(response){
		$scope.matches = response.data;
		console.log($scope.matches);
		for(let wl = 0; wl < $scope.matches.length; wl++){
			$scope.matches[wl] = Object.assign($scope.matches[wl], {
		        result: '' 
		    })
			if($scope.matches[wl].radiant_win == true && $scope.matches[wl].player_slot <= 127){ $scope.matches[wl].result = 'Win Match'; } 
			else if ($scope.matches[wl].radiant_win == false && $scope.matches[wl].player_slot <= 127) { $scope.matches[wl].result = 'Lost Match'; } 
			else if ($scope.matches[wl].radiant_win == true && $scope.matches[wl].player_slot >= 128) { $scope.matches[wl].result = 'Lost Match'; } 
			else if ($scope.matches[wl].radiant_win == false && $scope.matches[wl].player_slot >= 128) { $scope.matches[wl].result = 'Win Match'; }
		};
		for(let tm = 0; tm < $scope.matches.length; tm++){
			$scope.matches[tm] = Object.assign($scope.matches[tm],{ 
				team: '' 
			})
			if($scope.matches[tm].player_slot <= 127){ $scope.matches[tm].team = 'Radiant'; } 
			else if ($scope.matches[tm].player_slot >= 128){ $scope.matches[tm].team = 'Dire'; }
		};
		for(let q = 0; q < response.data.length; q++){
			if($scope.matches[q].skill == '0'){ $scope.matches[q].skill = 'Unknow'; } 
			else if($scope.matches[q].skill == '1'){ $scope.matches[q].skill = 'Normal Skill'; } 
			else if($scope.matches[q].skill == '2'){ $scope.matches[q].skill = 'High Skill'; } 
			else if($scope.matches[q].skill == '3'){ $scope.matches[q].skill = 'Very High Skill'; }
		};

		

		for (let i = 0; i < response.data.length; i++){

			$scope.matches[i] = Object.assign($scope.matches[i], {
				duration_time: '',
				last_played: '',
				moment_ago: ''
			})
			$scope.matches[i].last_played = $scope.matches[i].duration + $scope.matches[i].start_time;

			$scope.matches[i].moment_ago = moment( $scope.matches[i].last_played * 1000).startOf('day').fromNow();

			$scope.matches[i].duration_time = Math.ceil($scope.matches[i].duration / 60) + ':' + Math.ceil($scope.matches[i].duration % 60);

			if ($scope.matches[i].game_mode == '0') { $scope.matches[i].game_mode = 'Unknown';}
			else if ($scope.matches[i].game_mode == '1') { $scope.matches[i].game_mode = 'All Pick'; } 
			else if ($scope.matches[i].game_mode == '2') { $scope.matches[i].game_mode = "Captain's Mode"; } 
			else if ($scope.matches[i].game_mode == '3') { $scope.matches[i].game_mode = 'Random Draft'; } 
			else if ($scope.matches[i].game_mode == '4') { $scope.matches[i].game_mode = 'Single Draft'; } 
			else if ($scope.matches[i].game_mode == '5') { $scope.matches[i].game_mode = 'All Random'; } 
			else if ($scope.matches[i].game_mode == '6') { $scope.matches[i].game_mode = 'Intro'; } 
			else if ($scope.matches[i].game_mode == '7') { $scope.matches[i].game_mode = "Diretide"; } 
			else if ($scope.matches[i].game_mode == '8') { $scope.matches[i].game_mode = "Reverse Captain's Mode"; } 
			else if ($scope.matches[i].game_mode == '9') { $scope.matches[i].game_mode = 'Greeviling'; } 
			else if ($scope.matches[i].game_mode == '10') { $scope.matches[i].game_mode = 'Tutorial'; } 
			else if ($scope.matches[i].game_mode == '11') { $scope.matches[i].game_mode = 'Mid Only'; } 
			else if ($scope.matches[i].game_mode == '12') { $scope.matches[i].game_mode = 'Least Played'; } 
			else if ($scope.matches[i].game_mode == '13') { $scope.matches[i].game_mode = 'New Player Pool'; } 
			else if ($scope.matches[i].game_mode == '14') { $scope.matches[i].game_mode = 'Compendium Matchmaking'; } 
			else if ($scope.matches[i].game_mode == '15') { $scope.matches[i].game_mode = "Custom"; } 
			else if ($scope.matches[i].game_mode == '16') { $scope.matches[i].game_mode = "Captain's Draft"; } 
			else if ($scope.matches[i].game_mode == '17') { $scope.matches[i].game_mode = 'Balanced Draft'; } 
			else if ($scope.matches[i].game_mode == '18') { $scope.matches[i].game_mode = 'Ability Draft'; } 
			else if ($scope.matches[i].game_mode == '19') { $scope.matches[i].game_mode = 'Co-Op-Bots Bots'; } 
			else if ($scope.matches[i].game_mode == '20') { $scope.matches[i].game_mode = 'All Random Deathmatch'; } 
			else if ($scope.matches[i].game_mode == '21') { $scope.matches[i].game_mode = 'Mid-Only Mid 1v1'; } 
			else if ($scope.matches[i].game_mode == '22') { $scope.matches[i].game_mode = 'Ranked All Pick'; }
			else if ($scope.matches[i].game_mode == '23') { $scope.matches[i].game_mode = 'Turbo Turbo'; } 
			else if ($scope.matches[i].game_mode == '24') { $scope.matches[i].game_mode = 'Mutation'; }
		};
		
		$http({
			method: 'GET',
			url: '../assets/heroes.json'
		}).then(function success(heroes){
			// console.log(JSON.stringify(heroes.data));
			$scope.hero = heroes.data;
			for(let k = 0; k < response.data.length; k++){
				$scope.matches[k] = Object.assign($scope.matches[k], {
					hero_name: ''
				})
				for (n = 0; n < heroes.data.length; n++){
					if ($scope.matches[k].hero_id == $scope.hero[n].id) {
						$scope.matches[k].hero_name = $scope.hero[n].localized_name;
						$scope.matches[k].url = $scope.hero[n].url;
						// console.log($scope.matches);
					}
				}
			};

			

			$http({
				method: 'GET',
				url: 'https://api.opendota.com/api/players/' + account_id + '/heroes',
				params: {
					'api_key': api_key
				}
			}).then(function(bestHeroes){
				$scope.bestHero = bestHeroes.data;
				console.log($scope.bestHero)
				for(let f = 0; f < bestHeroes.data.length; f++){
					$scope.bestHero[f] = Object.assign($scope.bestHero[f],{
						hero_name: '',
						moment_ago: ''
					})
					$scope.bestHero[f].moment_ago = moment( $scope.bestHero[f].last_played * 1000 ).startOf('day').fromNow();
					for(let n = 0; n < heroes.data.length; n++){
						if($scope.bestHero[f].hero_id == $scope.hero[n].id){
							$scope.bestHero[f].hero_name = $scope.hero[n].localized_name;
							$scope.bestHero[f].url = $scope.hero[n].url;
							$scope.bestHero[f].win_rate = ($scope.bestHero[f].win / $scope.bestHero[f].games) * 100 + '%';
						}
					}
				};
				}, function failed(bestHeroes){

			})
			
		}, function failed(heroes){

		})
		
	}, function failed(response){

	});
		
    	(function($){
		  $(function() {
		    $('.menu__icon').on('click', function() {
		      $(this).closest('.menu').toggleClass('menu_state_open');
		    });
		  });
		})(jQuery);


		$(".function-content a").click(function(e) {
		  e.preventDefault();
		  $(".function-content a").removeClass('chosen');
		  $(this).addClass('chosen');
		});
 	
}]
}).filter('firstWord', firstWord).filter('other', other);

	firstWord.$inject = ['$filter'];
	other.$inject = ['$filter'];


	function firstWord($filter) {
		return function(data) {
			if(!data) return data;
			data = data.split(' ');
    		return data[0];
    	};
	};
	function other($filter) {
		return function(data) {
			if(!data) return data;
			data = data.split(' ').slice(1,3).join(' ');
			return data;
    		
    	};
	};






