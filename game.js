// step#2.3
var buttonColours = ["red", "blue", "green", "yellow"];
//step#2.5
var gamePattern = [];
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];
// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
// 2. Create a new variable called level and start at level 0.
var level = 0;

// 1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {
    // 3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  // 4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  }
  else {
    console.log("wrong")
    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 300);

    $("#level-title").text("Game Over, Press Any Key to Restart");

// 2. Call startOver() if the user gets the sequence wrong.
    startOver();
  }

}

// Step#2.1
function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // 4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  // 5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  // Step#2.2
  var randomNumber = Math.floor(Math.random() * 4);
  //step#2.4
  var randomChosenColour = buttonColours[randomNumber];
  //step#2.6
  gamePattern.push(randomChosenColour);
  //  console.log(gamePattern);
  //step#3.1
  //step#3.2
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //step#3.3
  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}

// 1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.
// 2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and move it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// 1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

// 1. Create a new function called startOver().

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
