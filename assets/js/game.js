// This makes sure the DOM has been fully loaded before the JavaScript code runs
$(document).ready(function() {

    // Global Variables, Arrays, Objects
    // ==================================================================================================

    // Creating a object within a object to hold the pokemons
    var pokemons = {
        // Object #1: Palkia
        "Palkia": {
            name: "Palkia",
            attack: 12,
            health: 90,
            imageUrl: "assets/img/palkia.png"
        },
        // Object #2: Mewto
        "Mewtwo": {
            name: "Mewtwo",
            attack: 11,
            health: 106,
            imageUrl: "assets/img/mewto.jpg"
        },
        // Object #3: Lugia
        "Lugia": {
            name: "Lugia",
            attack: 9,
            health: 106,
            imageUrl: "assets/img/lugia.jpeg"
        },
        // Object #4: Entei
        "Entei": {
            name: "Entei",
            attack: 11,
            health: 115,
            imageUrl: "assets/img/entei.png"
        }
    };

    // This empty variable will store the pokemon the user selects
    var userPokemon = "";
    // This empty array will store the pokemons the user didn't select
    var opponents = [];
    // This empty variable will store the user opponent
    var userOpponent = "";
    // This will keep track of the number of attacks during battle
    var attackCounter = 1;

    // Functions
    // ==================================================================================================
    
    // Function #1
    // This function will create <div> tags to display the pokemons information
    function renderPokemon(pokemon, renderArea) {
        // Creating a <div> tag that will hold the pokemons entire information
        var pokemonDiv = $("<div class='pokemon' data-name='" + pokemon.name + "'>");
        // Creating a <div> tag to render the name of the pokemon
        var pokemonName = $("<div class='pokemon-name'>").text(pokemon.name);
        // Creating a <img> tag to render the image of the pokemon
        var pokemonImage = $("<img class='pokemon-image'>").attr("src", pokemon.imageUrl);
        // Creating a <div> tag to render the pokemon's attack 
        var pokemonAttack = $("<div class='pokemon-attack'>").text("A: " + pokemon.attack);
        // Creating a <div> tag to render the pokemon's health
        var pokemonHealth = $("<div class='pokemon-health'>").text("H: " + pokemon.health);
        // This appends the pokemons name, image, health, and attack to the pokemonDiv variable
        pokemonDiv.append(pokemonName).append(pokemonImage).append(pokemonAttack).append(pokemonHealth);
        // This appends the pokemons to the area to be rendered
        $(renderArea).append(pokemonDiv);
    };

    // Function #2
    // This function will render the pokemons
    function initializeGame() {
        // This for loop loops through the pokemons object
        for (var key in pokemons) {
            // Calling the renderPokemon() function to render all the pokemons and target the <#select-pokemon> div
            renderPokemon(pokemons[key], "#select-pokemon")
        }
        // Using the hide() method to hide the <.user-pokemon-section> div
        $(".user-pokemon-section").hide();
        // Using the hide() method to hide the <.select-opponent-section> div
        $(".select-opponent-section").hide();
        // Using the hide() method to hide the .<user-opponent-section> div
        $(".user-opponent-section").hide();
        // Using the hide() method to hide the <#attack-button> 
        $("#attack-button").hide();
        // Using the hide() method to hide the <.restart-section> div
        $(".restart-section").hide();
        // Using the hide() method to hide the pokemons attack
        $(".pokemon-attack").hide();
        // Using the hide() method to hide the pokemons health
        $(".pokemon-health").hide();
        // Using the hide() method to hide the <.game-message-section> div
        $(".game-message-section").hide();
    };

    // Calling the initializeGame() function to render the pokemons
    initializeGame();

    // Function #3
    // This function updates the page to render the selected pokemon
    function updatePokemon(pokemonObj, areaRender) {
        // This will empty the #render-area <div> so it can re-render the user pokemon
        $(areaRender).empty();
        // Calling the renderPokemon() function to render the user pokemon
        renderPokemon(pokemonObj, areaRender);
    };

    // Function #4
    // This function will render the pokemons the user didn't select(the user opponents)
    function userEnemies(enemyArray) {
        // This for loop loops the number of opponents there are
        for (var i = 0; i < enemyArray.length; i++) {
            // Calling the renderPokemon function to render the user opponents and targeting the <#opponents> div
            renderPokemon(enemyArray[i], "#opponents");
            // Using the hide() method to hide the pokemons attack
            $(".pokemon-attack").hide();
            // Using the hide() method to hide the pokemons health
            $(".pokemon-health").hide();
        }
    };

    // Function #5
    // This function will render messages from the game
    function renderMessage(message) {
        // This variable holds the <game-message-section> div
        var gameMessageSet = $("#game-message");
        // This variable holds a new div to add text
        var newMessage = $("<div>").text(message);
        // This appends the text to the #game-message <div>
        gameMessageSet.append(newMessage);
    };

    // Function #7
    // This function handles restarting the game after all opponents have been defeated or the user has been defeated
    function restartGame(resultMessage) {
        // This variable holds a button that when it is clicked, it reloads the page
        var restartButton = $("#restart-button").click(function() {
            // Using the location.reload() method to reload the page
            location.reload();
        });
        // This variable holds a div to render the victory/defeat messages
        var gameState = $("<div>").text(resultMessage);
        // Targeting the <body> div tag to append the game messages
        $("body").append(gameState);
        // Targeting the <body> div tag to append the restart button
        $("body").append(restartButton);
        // Using the hide() method to hide the attack button
        $("#attack-button").hide();
    };

    // Function #8
    // This function handles clearing the game messages for the next game
    function clearMessage() {
        // This variable holds the <game-message-section> div tag
        var gameMessage = $("#game-message");
        // Using the text() method to render a empty message
        gameMessage.text("");
    };

    // onClick Events
    // ==================================================================================================

    // onClick Event #1
    // This onclick event handles when the user selects their pokemon
    $("#select-pokemon").on("click", ".pokemon", function() {
        // This variable holds the name of the user pokemon using the attr() method
        var userPokemonName = $(this).attr("data-name");
        // If the user hasn't picked a pokemon...
            // Assigning the name of the user pokemon to the userPokemon variable
            userPokemon = pokemons[userPokemonName];
            // A for loop that will send the rest of the pokemons to the opponents array
            for (var key in pokemons) {
                // If the rest of the pokemons do not match the name of the user pokemon...
                if (key !== userPokemonName) {
                    // Send the pokemons to the opponent array using the push() method
                    opponents.push(pokemons[key]);
                }
            }
            // Using the hide() method to hide the <select-pokemon-section> div
            $(".select-pokemon-section").hide();
            // Using the show() method to display the user pokemon
            $(".user-pokemon-section").show();
            // Using the show() method to display the user opponents
            $(".select-opponent-section").show();
            // Calling the updatePokemn() function to render the user pokemon and target the <#user-pokemon> div
            updatePokemon(userPokemon, "#user-pokemon");
            // Calling the userEnemies() function to render the opponents
            userEnemies(opponents);
    });

    // onClick Event #2
    // This onclick event handles when the user selects an opponent
    $(".select-opponent-section").on("click", ".pokemon", function() {
        // Using the show() method to display the user opponent
        $(".user-opponent-section").show();
        // This variable holds the name of the opponent
        var opponentName = $(this).attr("data-name");
        // If the <#user-opponent> elements equals 0...
        if ($("#user-opponent").children().length === 0) {
            // This variable holds the pokemon name of the opponent
            userOpponent = pokemons[opponentName];
            // Calling the updatePokemon() function to render the opponent
            updatePokemon(userOpponent, "#user-opponent");
            // This removes the selected opponent from the <opponents> div
            $(this).remove();
            // Calling the clearMessage() function
            clearMessage();
            // Using the hide() method to hide the <select-opponent-section> div
            $(".select-opponent-section").hide();
            // Using the show() method to display the <attack-button> div
            $("#attack-button").show();
            // Using the show() method to display the pokemons attack
            $(".pokemon-attack").show();
            // Using the show() method to display the pokemons health
            $(".pokemon-health").show();
            // Using a setTimeout() method to delay an alert
            setTimeout(function(){
                // Using the alert() method to display an alert box with text
                alert("Click on the pokemon to find out more about them!");
                // Alert 1 second after the user selects an opponent (1000 millisecond = 1 second)
            }, 1000);
        }
    });

    // onClick Event #3
    // This onclick event handles when the attack-button is clicked
    $("#attack-button").on("click", function() {
            // Using the show() method to display game messages
            $(".game-message-section").show();
            // Creating a variable to display the game messages when the user attacks
            var attackMessage = "You attacked " + userOpponent.name + " for " + userPokemon.attack * attackCounter + " damage!";
            // Creating a variable to display the game messages when the opponent attacks
            var counterAttackMessage = userOpponent.name + " attacked you for " + userOpponent.attack * attackCounter + " damage!";
            // Calling the clearMessage() function
            clearMessage();
            // This reduces the opponents health when the user attacks
            userOpponent.health -= userPokemon.attack + attackCounter;
            // This reduces the users health when the opponent attacks
            userPokemon.health -= userOpponent.attack + attackCounter;
            // If the opponents health is greater than zero...
            if (userOpponent.health >= 0) {
                // Calling the updatePokemon() function to render the opponents new health after attack
                updatePokemon(userOpponent, "#user-opponent");
                // Calling the renderMessage() function to render the messages when the user attacks
                renderMessage(attackMessage);
                // Calling the renderMessage() function to render the messages n
                renderMessage(counterAttackMessage);
                // Calling the updatePokemon() function to render the user pokemons new health after 
                updatePokemon(userPokemon, "#user-pokemon");
                // If the user pokemons health is less than zero...
                if (userPokemon.health <= 0) {
                    // Calling the clearMessage() function to clear the game messages
                    clearMessage();
                    // Calling the restartGame() function to render the restart button
                    restartGame();
                    // Calling the renderMessage() function to render defeated message
                    renderMessage("You have been defeated!");
                }
            }
            // A else statement if the opponents health is less than zero
            else {
                // Using the hide() method to hide the attack button once the fight is over
                $("#attack-button").hide();
                // Creating a variable that holds a victory message
                var victoryMessage = "You win! You have defeated " + userOpponent.name + ".";
                // Calling the renderMessage() function to render the victory message
                renderMessage(victoryMessage);
                // Calling the restartGame() function to render the restart button
                restartGame();
                // Using the hide() method to hide the opponent if the user wins
                $("#user-opponent").hide();
            }
            // Using the increment operator
            attackCounter++
    });

    // Onclick Event #4
    // This handles when the user clicks on their pokemon to get a description
    $("#user-pokemon").on("click", function() {
        // If the user pokemon name is Palkia...
        if (userPokemon.name === "Palkia") {
            // Alert the type of pokemon Palkia is
            alert(userPokemon.name + " is a water dragon type legendary pokemon.");
        }
        // If the user pokemon name is Mewtwo...
        else if (userPokemon.name === "Mewtwo") {
            // Alert the type of pokemon Mewtwo is
            alert(userPokemon.name + " is a psychic type legendary pokemon.");
        }
        // If the user pokemon name is Lugia...
        else if (userPokemon.name === "Lugia") {
            // Alert the type of pokemon Lugia is
            alert(userPokemon.name + " is a psychic flying type legendary pokemon.");
        }
        // If the user pokemon name is Entei...
        else {
            // Alert the type of pokemon Entei is
            alert(userPokemon.name + " is a fire type legendary pokemon.");
        }
    });

    // Onclick event #5
    // This handles when the user clicks on their opponent to get a description of the pokemon
    $("#user-opponent").on("click", function() {
        // If the opponent pokemon name is Palkia...
        if (userOpponent.name === "Palkia") {
            // Alert the type of pokemon Palkia is
            alert(userOpponent.name + " is a water dragon type legendary pokemon.");
        }
        // If the opponent pokemon name is Mewtwo...
        else if (userOpponent.name === "Mewtwo") {
            // Alert the type of pokemon Mewtwo is
            alert(userOpponent.name + " is a psychic type legendary pokemon.");
        }
        // If the opponent pokemon name is Lugia...
        else if (userOpponent.name === "Lugia") {
            // Alert the type of pokemon Lugia is
            alert(userOpponent.name + " is a psychic flying type legendary pokemon.");
        }
        // If the opponent pokemon name is Entei...
        else {
            // Alert the type of pokemon Entei is
            alert(userOpponent.name + " is a fire type legendary pokemon.");
        }
    });

});