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
function getInput(id) {
    return document.getElementById(id);
}
function createNewGame() {
    getInput("score1").value = "0";
    getInput("score2").value = "0";
    var player_1 = getInput("player1");
    var player_2 = getInput("player2");
    if (player_1.value == "" || player_2.value == "" || player_1.value != player_2.value) {
        getInput("error").innerText = "Please make sure you have entered unique names in the player's name box.";
    }
    else {
        document.getElementById("turn").classList.add("open");
        getInput("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (currentPlayerName != player2Name || currentPlayerName != player1Name || currentPlayerName == player2Name) {
        currentPlayerName = player1Name;
    }
    else {
        currentPlayerName = player2Name;
    }
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
}
function holdDie() {
    changePlayers();
}
