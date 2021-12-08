/**
 * Handles the on click event for the Add New Video Game button
 */
window.onload = function(){
    let newGameBtn = getInput("new_game");
    let newRollBtn = getInput("roll");
    let newHoldBtn = getInput("hold");
    let newCloseBtn = getInput("close");
    newGameBtn.onclick = createNewGame;
    newRollBtn.onclick = rollDie;
    newHoldBtn.onclick = holdDie;
    newCloseBtn.onclick = closeWinner;
}

// Global variable to hold current player
let currentPlayerName = getInput("player2").value;

//Constant to limit game score
const scoreLimit = 100;

/**
 * generate a number between one and six to simulate a die roll
 */
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

/**
 * Helper function to getInputById and returns the HTMLElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLElement that is referenced by the id parameter
 */
 function getElem(id: string): HTMLElement {
    return document.getElementById(id);
}

/**
 * Clears up the winner message,closes the winner box, and opens main back up.
 */
function closeWinner(): void {
        getElem("winnersId").innerText = "";
        getInput("winner").classList.remove("open");
        getElem("main").classList.remove("close");
        readyNewGame();
}

/**
 * This function removes the disabled attribute on the player's name and reloads
 * the window, which prepares the way for a new game.
 */
function readyNewGame(): void {
    getInput("player1").removeAttribute("disabled");
    getInput("player2").removeAttribute("disabled");
    location.reload();
}


/**
 * This function does a little bit of validation to make sure there is names
 * in the player's name boxes. It also readies the game's first round.
 */
function createNewGame(){
    clearError();

    // set starting player after adjustments
    currentPlayerName = getInput("player2").value;

    //set player 1 and player 2 scores to 0
    setValues("0","score1");
    setValues("0","score2");
    setValues("0", "total");
    setValues("0", "die");

    //verify each player has a name
    let player_1 = getInput("player1");
    let player_2 = getInput("player2");

    //if both players don't have a name entered
    if(player_1.value==""|| player_2.value =="" || player_1.value == player_2.value){
        getInput("error").innerHTML =
            "<p>Please make sure you have entered something and that the names are unique.</p>"
    }
    //if both players do have a name start the game!
    else{
        changePlayers();
        getInput("turn").classList.add("open");

        //lock in player names and then change players
        getInput("player1").setAttribute("disabled", "disabled");
        getInput("player2").setAttribute("disabled", "disabled");
    }
}

/**
 * This function clears out the error message.
 */
function clearError() {
    getInput("error").innerHTML = "";
}

/**
 * This function changes players and displays the current player.
 */
function changePlayers():void{
    let playerOneName = getInput("player1").value;
    let playerTwoName = getInput("player2").value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName == playerTwoName){
        currentPlayerName = playerOneName;
        getElem("current").innerText = playerOneName;
    }
    else{
        currentPlayerName = playerTwoName;
        getElem("current").innerText = playerTwoName;
    }
}

/**
 * This function simulates the rolling of the die and if the roll is one ends
 * that players turn.
 */
function rollDie():void{
    //get the current turn total
    let currTotal = getValues("total");

    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let currRoll = generateRandomValue();

    //if the roll is 1
    if(currRoll==1){
        //  change players
        changePlayers();
        //  set current total to 0
        setValues("0", "total");
        setValues("1", "die");
    }
    else{

        //if the roll is greater than 1
        //  add roll value to current total
        currTotal += currRoll;
        //set the die roll to value player rolled
        setValues(currRoll.toString(), "die")
        //display current total on form
        setValues(currTotal.toString(), "total");
        checkScore(currTotal);
    }
}

/**
 * This function first checks to see who the current player. It then checks to
 * see if the score has reached it's limit.
 * @param currTotal is the current turn total.
 */
function checkScore(currTotal:number):void{
    //determine who the current player is
    let player1Name = getInput("player1").value;
    let player2Name = getInput("player2").value;
    let score_1 = getValues("score1");
    let score_2 = getValues("score2");
    let message:string = ""
    if (currentPlayerName == player2Name){
        let totalScore = score_2 + currTotal;
        if(totalScore >= scoreLimit){
            message = player2Name + " wins " + totalScore + " to " + score_1;
            setValues(totalScore.toString(), "score2");
            openWinner(message);
        }
    }
    else if(currentPlayerName == player1Name){
        let totalScore = score_1 + currTotal;
        if(totalScore >= scoreLimit){
            message = player1Name + " wins " + totalScore + " to " + score_2;
            setValues(totalScore.toString(), "score1");
            openWinner(message);
        }
    }
}

/**
 * This function first closes the main element. It then closes the turn section.
 * It then displays the message to the winnersId span. Lastly it displays the
 * winner section.
 * @param message this string contains the message on who won and the score..
 */
function openWinner(message:string):void{
    getElem("main").classList.add("close");
    getElem("turn").classList.remove("open");
    getElem("winnersId").innerText = message;
    getElem("winner").classList.add("open");
}

/**
 * this function is a helper function that grabs scores from the text boxes.
 * @param id is the id of the score you want to grab.
 * @returns the score of said id.
 */
function getValues(id:string):number {
    //get the current turn total
    return parseInt(getInput(id).value);
}

/**
 * this function is a helper function that sets the score represented by id.
 * @param score the score value that you want to set.
 * @param id the id of the score you want to set.
 */
function setValues(score:string, id:string):void{
    getInput(id).value = score;
}

/**
 * This function adds the current score to that player's score and hands off to
 * the next player's turn
 */
function holdDie():void{
    //get the current turn total
    let currTotal = getValues("total");

    //determine who the current player is
    let player1Name = getInput("player1").value;
    let player2Name = getInput("player2").value;

    //add the current turn total to the player's total score
    if(currentPlayerName == player1Name){
        let score_1 = parseInt(getInput("score1").value);
        let total = currTotal + score_1;
        setValues(total.toString(), "score1");
    }
    else if(currentPlayerName == player2Name){
        let score_2 = parseInt(getInput("score2").value);
        let total = currTotal + score_2;
        setValues(total.toString(), "score2");
    }

    //reset the turn total to 0
    setValues("0", "total");

    // reset die to 0
    setValues("0", "die")
    
    //change players
    changePlayers();
}