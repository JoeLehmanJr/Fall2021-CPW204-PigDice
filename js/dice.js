window.onload = function () {
    var newGameBtn = getInput("new_game");
    var newRollBtn = getInput("roll");
    var newHoldBtn = getInput("hold");
    var newCloseBtn = getInput("close");
    newGameBtn.onclick = createNewGame;
    newRollBtn.onclick = rollDie;
    newHoldBtn.onclick = holdDie;
    newCloseBtn.onclick = closeWinner;
};
var currentPlayerName = getInput("player2").value;
var scoreLimit = 100;
function generateRandomValue() {
    var random = Math.floor(Math.random() * 6) + 1;
    return random;
}
function getInput(id) {
    return document.getElementById(id);
}
function getElem(id) {
    return document.getElementById(id);
}
function closeWinner() {
    getElem("winnersId").innerText = "";
    getInput("winner").classList.remove("open");
    getElem("main").classList.remove("close");
    readyNewGame();
}
function readyNewGame() {
    getInput("player1").removeAttribute("disabled");
    getInput("player2").removeAttribute("disabled");
    location.reload();
}
function createNewGame() {
    clearError();
    currentPlayerName = getInput("player2").value;
    setValues("0", "score1");
    setValues("0", "score2");
    setValues("0", "total");
    setValues("0", "die");
    var player_1 = getInput("player1");
    var player_2 = getInput("player2");
    if (player_1.value == "" || player_2.value == "" || player_1.value == player_2.value) {
        getInput("error").innerHTML =
            "<p>Please make sure you have entered something and that the names are unique.</p>";
    }
    else {
        changePlayers();
        getInput("turn").classList.add("open");
        getInput("player1").setAttribute("disabled", "disabled");
        getInput("player2").setAttribute("disabled", "disabled");
    }
}
function clearError() {
    getInput("error").innerHTML = "";
}
function changePlayers() {
    var playerOneName = getInput("player1").value;
    var playerTwoName = getInput("player2").value;
    if (currentPlayerName == playerTwoName) {
        currentPlayerName = playerOneName;
        getElem("current").innerText = playerOneName;
    }
    else {
        currentPlayerName = playerTwoName;
        getElem("current").innerText = playerTwoName;
    }
}
function rollDie() {
    var currTotal = getValues("total");
    var currRoll = generateRandomValue();
    if (currRoll == 1) {
        changePlayers();
        setValues("0", "total");
        setValues("1", "die");
    }
    else {
        currTotal += currRoll;
        setValues(currRoll.toString(), "die");
        setValues(currTotal.toString(), "total");
        checkScore(currTotal);
    }
}
function checkScore(currTotal) {
    var player1Name = getInput("player1").value;
    var player2Name = getInput("player2").value;
    var score_1 = getValues("score1");
    var score_2 = getValues("score2");
    var message = "";
    if (currentPlayerName == player2Name) {
        var totalScore = score_2 + currTotal;
        if (totalScore >= scoreLimit) {
            message = player2Name + " wins " + totalScore + " to " + score_1;
            setValues(totalScore.toString(), "score2");
            openWinner(message);
        }
    }
    else if (currentPlayerName == player1Name) {
        var totalScore = score_1 + currTotal;
        if (totalScore >= scoreLimit) {
            message = player1Name + " wins " + totalScore + " to " + score_2;
            setValues(totalScore.toString(), "score1");
            openWinner(message);
        }
    }
}
function openWinner(message) {
    getElem("main").classList.add("close");
    getElem("turn").classList.remove("open");
    getElem("winnersId").innerText = message;
    getElem("winner").classList.add("open");
}
function getValues(id) {
    return parseInt(getInput(id).value);
}
function setValues(score, id) {
    getInput(id).value = score;
}
function holdDie() {
    var currTotal = getValues("total");
    var player1Name = getInput("player1").value;
    var player2Name = getInput("player2").value;
    if (currentPlayerName == player1Name) {
        var score_1 = parseInt(getInput("score1").value);
        var total = currTotal + score_1;
        setValues(total.toString(), "score1");
    }
    else if (currentPlayerName == player2Name) {
        var score_2 = parseInt(getInput("score2").value);
        var total = currTotal + score_2;
        setValues(total.toString(), "score2");
    }
    setValues("0", "total");
    setValues("0", "die");
    changePlayers();
}
