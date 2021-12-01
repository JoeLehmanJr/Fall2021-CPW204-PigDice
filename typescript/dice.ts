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
 * Helper function to get and return the HTMLElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLElement that is referenced by the id parameter
 */
 function getElem(id: string): HTMLElement {
    return document.getElementById(id);
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
    setValues(0,"score1");
    setValues(0,"score2");
    setValues(0, "total");
    //verify each player has a name
    let player_1 = getInput("player1");
    let player_2 = getInput("player2");

    //if both players don't have a name entered
    if(player_1.value==""|| player_2.value =="" || player_1.value == player_2.value){
        getInput("error").innerText =
            "Please make sure you have entered unique names in the player's name box."
    }
    //if both players do have a name start the game!
    else{
        changePlayers();
        getInput("turn").classList.add("open");
        setValues(0, "total");

        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
    }
}
function changePlayers():void{
    let currentPlayerName = getInput("current");
    let player1Name = getInput("player1").value;
    let player2Name = getInput("player2").value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName.value == null || currentPlayerName.value == player2Name || player1Name == player2Name){
        currentPlayerName.innerText = player1Name
    }
    else{
        currentPlayerName.innerText = player2Name
    }
}



function rollDie():void{
    //get the current turn total
    let currTotal = getTotal();

    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let currRoll = generateRandomValue();

    //if the roll is 1
    if(currRoll==1){
        //  change players
        changePlayers();
        //  set current total to 0
        setValues(0, "total");
    }
    else{

        //if the roll is greater than 1
        //  add roll value to current total
        currTotal += currRoll;
        //set the die roll to value player rolled
        setValues(currRoll, "die")
        //display current total on form
        setValues(currTotal, "total");
    }
}

function getTotal():number {
    //get the current turn total
    return parseInt(getInput("total").value);
}

function setValues(score:number, id:string):void{
    let currTotal = parseInt(getInput(id).value);
    currTotal = score
}

function holdDie():void{
    //get the current turn total

    //determine who the current player is

    //add the current turn total to the player's total score

    //reset the turn total to 0

    //change players
    changePlayers();
}