window.onload = function () {
    var newGameBtn = getInput("new_game");
    newGameBtn.onclick = createNewGame;
    getInput("roll").onclick = rollDie;
    getInput("hold").onclick = holdDie;
};
function generateRandomValue() {
    var random = Math.floor(Math.random() * 6) + 1;
    return random;
}
function getElem(id) {
    return document.getElementById(id);
}
function getInput(id) {
    return document.getElementById(id);
}
function createNewGame() {
    setValues(0, "score1");
    setValues(0, "score2");
    setValues(0, "total");
    var player_1 = getInput("player1");
    var player_2 = getInput("player2");
    if (player_1.value == "" || player_2.value == "" || player_1.value == player_2.value) {
        getInput("error").innerText =
            "Please make sure you have entered unique names in the player's name box.";
    }
    else {
        changePlayers();
        getInput("turn").classList.add("open");
        setValues(0, "total");
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
    }
}
function changePlayers() {
    var currentPlayerName = getInput("current");
    var player1Name = getInput("player1").value;
    var player2Name = getInput("player2").value;
    if (currentPlayerName.value == null || currentPlayerName.value == player2Name || player1Name == player2Name) {
        currentPlayerName.innerText = player1Name;
    }
    else {
        currentPlayerName.innerText = player2Name;
    }
}
function rollDie() {
    var currTotal = getTotal();
    var currRoll = generateRandomValue();
    if (currRoll == 1) {
        changePlayers();
        setValues(0, "total");
    }
    else {
        currTotal += currRoll;
        setValues(currRoll, "die");
        setValues(currTotal, "total");
    }
}
function getTotal() {
    return parseInt(getInput("total").value);
}
function setValues(score, id) {
    var currTotal = parseInt(getInput(id).value);
    currTotal = score;
}
function holdDie() {
    changePlayers();
}
