<?php 
      
    require('steamauth/steamauth.php');
    require('steamauth/userInfo.php');
    
?>

<!DOCTYPE html>
<html lang="en" ng-app="dota2base">
<head>
	<meta charset="UTF-8">
	<title>Dota Stats</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
</head>
<body ng-controller="Dota2BaseController">





<div class="jumbotron">

    
    <?if(isset($_SESSION['steamid'])){
        var_dump($_SESSION);
        // echo $steamprofile['steamid'];
        echo '<a href="steamauth/logout.php">LogOut</a>';
        }
        else{
            loginbutton();
        }
        
        
        
        $id = $steamprofile['steamid'];
    
        
        
        $subid = substr($id, 4); // because calculators are fags
        // echo $subid;
        $steamY = $subid;
        $steamY = $steamY - 1197960265728;
        $steamX = 0;
        if ($steamY%2 == 1){
        $steamX = 1;
        } else {
        $steamX = 0;
        }
        
        $steamY = (($steamY - $steamX) / 2 );
        $steamID = "STEAM_0:" . (string)$steamX . ":" . (string)$steamY;
        $steamY = $subid - 1197960265728;
        $steamID3 = (string)$steamY;
        // echo $steamID;
        // echo $steamID3;
    ?>
        
        
	<h1>Hello, It's a Dota 2 Statistic </h1><img src="assets/dota2logo/logo.png" alt="Logo" title="logo" />
    
	<!-- <input type="text" id="account_id"  minlength="9" maxlength="9" />
	<input type="submit" ng-click="enterId()" /> -->
		<h3> {{data.profile.personaname}}</h3>
		<img src={{data.profile.avatarfull}} alt="avatar" style="width: 80px; height: 80px; border-radius: 50%" />

		<span>Solo MMR: {{data.mmr_estimate.estimate}}</span>
		<span>Last LogIn: {{data.profile.last_login | date:'medium'}}</span>
		<div class="container">
			<h2>Top Heroes:</h2>
			<div class="row top_hero" >
				<div><span ng-repeat="item in bestHero | orderBy: '-win' | limitTo: 3"><img src="{{item.url}}" alt="" style="width: 70px;height: 40px;border: 2px solid lightgrey" /></span></div>
				<div class="row">
					<span>{{rank}}</span>
					<span>{{win_rate}}</span>
					<span>{{record}}</span>
				</div>

			</div>
		</div>
</div>
<div class="container">
	<table>
		<tr>
			<th>Game Mode</th>
			<th>Hero</th>
			<th>Kills</th>
			<th>Death</th>
			<th>Assists</th>
			<th>GPM</th>
			<th>XPM</th>
			<th>LH</th>
			<th>HD</th>
			<th>Duration</th>
		</tr>
		<tr ng-repeat="item in matches | limitTo: 5">
			<td class="game_mode">{{item.game_mode}}</td>
			<td class="hero_id"><img src="{{item.url}}" alt="" style="width: 70px;height: 40px;border: 2px solid lightgrey"/></td>
			<td class="kills">{{item.kills}}</td>
			<td class="deaths">{{item.deaths}}</td>
			<td class="assists">{{item.assists}}</td>
			<td class="gold_per_min">{{item.gold_per_min}}</td>
			<td class="xp_per_min">{{item.xp_per_min}}</td>
			<td class="last_hits">{{item.last_hits}}</td>
			<td class="hero_damage">{{item.hero_damage}}</td>
			<td class="duration">{{item.duration}} min</td>
		</tr>
	</table>
</div>

<script>
    var account_id = '<?=$steamID3?>';
    console.log(account_id);
</script>




<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/angular.min.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/main.js"></script>	
</body>
</html>			