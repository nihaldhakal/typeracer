var countCharacters=0;
var startTime=new Date($.now());
var userKeyPressCount=0;

$(document).ready(function () {
    displayRandomText();

    $("button").on("click",function () {
        $('#userInput').focus();
        $('#userInput').val("");
    });
    $("#userInput").on("input",function(event){
        var modifierKeyKeyCodes = [16,17,18,20,27,37,38,39,40,46];
        if (modifierKeyKeyCodes.includes(event.keyCode) == false) {
            userKeyPressCount++;
        }

        updateWPM();
        giveColorFeedback();
        if (isGameOver() == true){
            handleGameOver();
        }
    });
});

function displayRandomText() {
    var randomIndex = Math.floor(Math.random()*quotes.length) && 0;
    var randomText = quotes[randomIndex];
    var randomTextCharArray = randomText.split("");
    for(var spanCount=0; spanCount < randomTextCharArray.length; spanCount++) {
        randomTextCharArray[spanCount] = '<span id= "'+spanCount +'">' + randomTextCharArray[spanCount] + '</span>';
    }
    var randomTextSpanified = randomTextCharArray.join("");
    $("#displayedText").html(randomTextSpanified);
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
    var displayedText = $('#displayedText').text();
    var userInput = $('#userInput').val();

    // check to see what is match length between displayedText and userInput
    // green-ify the match
    // red-ify the unmatch
    // if (displayedText.includes(userInput)) {
    //     $('#displayedText').css({ background: "#ccc", color: "green" });
    // } else {
    //     $('#displayedText').css({ background: "#cc1c1f", color: "red" });
    // }
    $('#displayedText').each(function () {
        if (displayedText.includes(userInput))
            $("#displayedText").addClass("match");
        else
            $("#displayedText").addClass("unmatch");
    });
}

function isGameOver(){
    return ($('#displayedText').text()===$('#userInput').val())
}

function handleGameOver() {
    displayAccuracy();
    disableInput();
}

function displayAccuracy() {
    var displayedTextCharLen= $('#displayedText').text().length;
    var userKeyPressInputCharLen=userKeyPressCount;
    var accuracy = ( displayedTextCharLen/userKeyPressInputCharLen )*100;
    accuracy=Math.round( accuracy );
    $('#showAccuracy').removeClass("hidden");
    $(' #accuracy').text(accuracy);
}
function disableInput() {
    $('#userInput').prop('disabled', true);
}

var quotes = ["Hello there", "Genius is one percent inspiration and ninety-nine percent perspiration.", "You can observe a lot just by watching.","A house divided against itself cannot stand.",
    "Difficulties increase the nearer we get to the goal.","Fate is in your hands and no one elses",
    "Be the chief but never the lord.","Nothing happens unless first we dream.","Well begun is half done.", "Life is a learning experience, only if you learn."
    ,"Self-complacency is fatal to progress.","Peace comes from within. Do not seek it without.","What you give is what you get.",
    "We can only learn to love by loving.","Life is change. Growth is optional. Choose wisely.","You'll see it when you believe it."
    ,"Today is the tomorrow we worried about yesterday.","It's easier to see the mistakes on someone else's paper."
    , "Every man dies. Not every man really lives.","To lead people walk behind them.","Having nothing, nothing can he lose."]
