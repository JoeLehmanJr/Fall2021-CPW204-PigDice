window.onload = function(){
    let newGameBtn = getInput("new_game");
    newGameBtn.onclick = createNewGame;
    getInput("roll").onclick =rollDie;
    getInput("hold").onclick = holdDie;
}
function generateRandomValue():number{
    var random = Math.floor(Math.random() * 6) + 1
    return random;
}


/**
 * Helper function to getInputById and returns the HTMLInputElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLInputElement that is referenced by the id parameter
 */
 function getInput(id: string): HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

function createNewGame(){
    //set player 1 and player 2 scores to 0
    getInput("score1").value = "0";
    getInput("score2").value = "0";

    //verify each player has a name
    let player_1 = getInput("player1");
    let player_2 = getInput("player2");

    //if both players don't have a name entered
    if(player_1.value==""|| player_2.value =="" || player_1.value != player_2.value){
        getInput("error").innerText = "Please make sure you have entered unique names in the player's name box."
    }
    //if both players do have a name start the game!
    else{
        document.getElementById("turn").classList.add("open");
        getInput("total").value = "0";
        
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function changePlayers():void{
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName != player2Name || currentPlayerName != player1Name||currentPlayerName==player2Name){
        currentPlayerName = player1Name
    }
    else{
        currentPlayerName = player2Name
    }
}



function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)

    //if the roll is 1
    //  change players
    //  set current total to 0
    
    //if the roll is greater than 1
    //  add roll value to current total

    //set the die roll to value player rolled
    //display current total on form
}

function holdDie():void{
    //get the current turn total
    //determine who the current player is
    //add the current turn total to the player's total score

    //reset the turn total to 0

    //change players
    changePlayers();
}