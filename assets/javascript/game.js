

	var characterPicked;
	var enemyPicked;
	var enemyBattling = false;
	var playerWon;
	var enemies = [];

	var aragorn = {
		name: "aragorn",
		display: "Aragorn",
		health: 120,
		attack: 5,
		baseAttack: 5,
		counterAttack: 12,
		photo: "assets/images/aragorn.jpg",
		gif: "https://media.giphy.com/media/1bxzS4UaompcA/giphy.gif",
	}
	var gandalf = {
		name: "gandalf",
		display: "Gandalf",
		health: 80,
		attack: 9,
		baseAttack: 9,
		counterAttack: 13,
		photo: "assets/images/gandalf.jpg",
		gif: "https://media.giphy.com/media/P726XW1pK3Luo/giphy.gif",
	}
	var orc = {
		name: "orc",
		display: "Orc",
		health: 54,
		attack: 16,
		baseAttack: 16,
		counterAttack: 20,
		photo: "assets/images/orc.jpg",
		gif: "https://media.giphy.com/media/RHPFRDbkdzlhm/giphy.gif",
	}
	var sauron = {
		name: "sauron",
		display: "Sauron",
		health: 200,
		attack: 2,
		baseAttack: 2,
		counterAttack: 11,
		photo: "assets/images/sauron.jpg",
		gif: "https://media.giphy.com/media/IwDamOsXzQSNq/giphy.gif",
	}

	var characters = [aragorn, gandalf, orc, sauron];

	$(document).ready(function() {

	$("#result").html("Lord of the Rings");
	//hide new game area
	$(".newGame").hide();

	$(".playerCharPick").on("click", function() {
		//reads data obj for character name
		characterPicked = eval($(this).data("obj"));
		//appends gif and name 
		$("#playerCharArea").append('<img src="'+ characterPicked.gif + '" class="image" data-obj="' + characterPicked.name + '">');
		//shows player picked fight area
		$("#playerCharArea").show();
		//function to show stats
		updatePlayerStats();
		//empties out div with characters
		$("#playerCharSelection").empty();
		//empties result,placeholder
		//$("#result").html("");
		//loop through characters to select and move to enemy section
		for (i=0;i<characters.length;i++) {
			if (characters[i].name !== characterPicked.name) {
				$("#enemyCharSelection").append('<div class = "col-md-3 cont"><img src="' + characters[i].photo + '" class="enemyCharPick" data-obj="' + characters[i].name + '"></div>');
			}
		}

	});
		//click for enemy
	$("#enemyCharSelection").on("click", ".enemyCharPick", function() {
		//shows button for new game
		$(".newGame").show();
		//checks if battling
		if (!enemyBattling) {
			enemyPicked = eval($(this).data("obj"));
			//moves enemy to fight area
			$("#enemyCharArea").append('<img src="'+ enemyPicked.gif + '" class="image" id="enemyChar" data-obj="' + enemyPicked.name + '">');
			//shows fight area
			$("#enemyCharArea").show();
			updateEnemyStats();
			//shows attack button
			$("#attack").show();
			//hides enemy selected in the choosing area and pushes to enemy array and battling true
			$(this).hide();
			enemies.push(enemyPicked);
			enemyBattling = true;
		}
	});
	//click for attack button
	$(".attack").on("click", function() {
		// player attacks and player being attacks loses health equal to attack
		// Player attack increases by base amount
		// If enemy is not dead, enemy counter attacks, player loses health equal to enemy counter attk
		if (enemyBattling == true) {

			enemyPicked.health -= characterPicked.attack;
			characterPicked.attack += characterPicked.baseAttack;
			updateEnemyStats();

			if (enemyPicked.health <= 0) { //Checks to see if enemy has been defeated
				$("#enemyChar").remove();
				$("#enemyName").html("");
				$("#enemyHealth").html("");
				enemyBattling = false;
				if (enemies.length == 3) { //Once all 3 enemies have been fought
					var enemyLiving = false;
					for (i=0; i<enemies.length;i++) {
						if (enemies[i].health > 0) {
							enemyLiving = true;
						}
					}
					if (enemyLiving == false) { //Once all 3 enemies have 0 health
						playerWon = true;
						$("#result").html("Player 1 Wins!");
						$(".attack").hide();
					}
				}
			}

			else {
				characterPicked.health -= enemyPicked.counterAttack;
				updatePlayerStats();
					if (characterPicked.health <= 0) { //Checks to see if player has been defeated
						playerLoss = false;
						$("#result").html("CPU Wins");
						$(".attack").hide();
					}
			}
			
		}
		else {
			alert("Please select another enemy");
		}
	});

	$(".newGame").on("click", function() {
		location.reload();
	});

	function updatePlayerStats() {
		$("#playerHealth").html("HP: " + characterPicked.health + "<br />Attack: " + characterPicked.attack);
		$("#playerName").html(characterPicked.display);
	}
	function updateEnemyStats() {
		$("#enemyHealth").html("HP: " + enemyPicked.health + "<br />Attack: " + enemyPicked.attack);
		$("#enemyName").html(enemyPicked.display);
	}

})
