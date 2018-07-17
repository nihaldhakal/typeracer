var countCharacters=0;
var startTime=new Date($.now());
$(document).ready(function () {
    displayRandomText();
    $("button").on("click",function () {
        $('#userInput').focus();
        $('#userInput').val("");
    });

    $("#userInput").keyup(function(){
        giveColorFeedback();
        updateWPM();
        handleGameOver();

    });
});

function displayRandomText() {
    var randomIndex = Math.floor(Math.random()*quotes.length);
    var randomItem = quotes[randomIndex];
    document.getElementById("displayedText").innerHTML = randomItem;
}

function updateWPM(){
    countCharacters += 1;
    var currentTime=new Date($.now());
    var timeInSecs = (currentTime-startTime)/1000;
    var timeInMins = timeInSecs/60;
    var wordsWritten = countCharacters/5;
    var wpm = wordsWritten/timeInMins;
    wpm = parseInt(wpm,10);
    $('#checkWpm').text(wpm);
}
function giveColorFeedback(){
    console.log("giveColorFeedback called.");
    var displayedText = $('#displayedText').html();
    var userInput = $('#userInput').val();
    console.log(displayedText);
    console.log(userInput);

    if (displayedText.includes(userInput)) {
        $('#userInput').css({ background: "#ccc", color: "green" });
    } else {
        $('#userInput').css({ background: "#cc1c1f", color: "red" });
    }

}

// returns boolean determining whether or not the game has ended.
function isGameOver(){
    if ($('#displayedText').html()===$('#userInput').val()) {
        displayAccuracy();
        return true;
    }
    else {
        return false;
    }
}

// updates relevant entities in the DOM.
function handleGameOver() {
    if(isGameOver()===true){
        alert($('#showAccuracy'));
    }
}

// should display accuracy upon completion of the game.
function displayAccuracy() {
    var displayedTextCharLen= $('#displayedText').html().length;
    var userInputCharLen=$('#userInput').val().length;
    var accuracy=(displayedTextCharLen/userInputCharLen)*100;
    console.log(accuracy);
    $('#showAccuracy').html(accuracy);

}

var quotes = ["Genius is one percent inspiration and ninety-nine percent perspiration.", "You can observe a lot just by watching.","A house divided against itself cannot stand.",
    "Difficulties increase the nearer we get to the goal.","Fate is in your hands and no one elses",
    "Be the chief but never the lord.","Nothing happens unless first we dream.","Well begun is half done.", "Life is a learning experience, only if you learn."
    ,"Self-complacency is fatal to progress.","Peace comes from within. Do not seek it without.","What you give is what you get.",
    "We can only learn to love by loving.","Life is change. Growth is optional. Choose wisely.","You'll see it when you believe it."
    ,"Today is the tomorrow we worried about yesterday.","It's easier to see the mistakes on someone else's paper."
    , "Every man dies. Not every man really lives.","To lead people walk behind them.","Having nothing, nothing can he lose."]
