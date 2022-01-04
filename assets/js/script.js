var startBtn = document.querySelector("#start");
var display = document.querySelector("#display");
var winsDisplay = document.querySelector("#wins");
var lossesDisplay = document.querySelector("#losses");
var reset = document.querySelector("#reset");
var timer = document.querySelector("#timer");
var winLoss = document.querySelector("#win-loss");
var alert = document.querySelector("#alert");

var wins;;
var losses;
var word = "";
var wordArray = [];
var keyword = []

// wordbank
var wordbank = [
    "heyEmmaIThinkYoureCuteAndIHopeYouFeelBetter"
]

// start button
startBtn.addEventListener("click", newGame);

// keydown listener
document.addEventListener("keydown", keydownAction);


function newGame() {
    word = wordbank[Math.floor(Math.random()*wordbank.length)]
    wordArray = word.split("");
    keyword = [];
    for (let i = 0; i < word.length; i++) {
        keyword[i] = "_";
    }
    display.textContent = keyword.join(" ");
    // setTime(600);
    winLoss.textContent = "";
}

// keydown event
function keydownAction(event) {
    var key = event.key;
    console.log(key);
    if (word.toLocaleLowerCase().includes(key)) {
        console.log("contains");
        for (let i = 0; i < wordArray.length; i++) {
            element = wordArray[i]
            if (key.toString().toLowerCase() == element.toLowerCase()) {
                keyword[i] = wordArray[i];
            }
        }
        console.log(keyword);
        console.log(wordArray);
        display.textContent = keyword.join(" ");
        if (keyword.length === wordArray.length && keyword.every(function(value, index) { return value === wordArray[index]})) {
            endGame();
        }
    }
}

// timer
function setTime(time) {
    // Sets interval in variable
    secondsLeft = time;
    timer.textContent ="Time remaining: " + secondsLeft + " seconds";
    timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent ="Time remaining: " + secondsLeft + " seconds";
      if (secondsLeft < 1) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // timer.textContent = "Time Remaining: 0 seconds";
        // Calls for endgame function to run when timer runs out
        endGame();
      }
    }, 1000);
}

// scores
function getScores() {
    storedWins = localStorage.getItem("wins");
    if (storedWins != null) {
        wins = parseInt(storedWins);
    } else {
        wins = 0;
    }
    winsDisplay.textContent = "Wins: " + wins.toString();
    storedLosses = localStorage.getItem("losses");
    if (storedLosses != null) {
        losses = parseInt(storedLosses);
    } else {
        losses = 0;
    }
    lossesDisplay.textContent = "Losses: " + losses;
}

function endGame() {
    if (keyword.length === wordArray.length && keyword.every(function(value, index) { return value === wordArray[index]})) {
        winLoss.textContent = "You win!";
        alert.textContent = "Miss you babe... and your dumptruck :)"
        wins++;
        localStorage.setItem("wins", JSON.stringify(wins));
    } else {
        winLoss.textContent = "You lose! Press start to try again plz";
        losses++;
        localStorage.setItem("losses", JSON.stringify(losses));
    }
    getScores();
}

getScores();

