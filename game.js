
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level= 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        startOver()
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour) 
    animatePress(userChosenColour)
    check(userClickedPattern.length-1)
})

function startOver(){
    $("body").removeClass("game-over")
    gamePattern = []
    userClickedPattern = []
    level= parseInt(0)
}


function check(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } 
    else{
        $("body").addClass("game-over")
        playSound("wrong")
        $("h1").text("Game Over, Press any key to restart" )
        started = false;

    }
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour) 
    
    $("h1").text(`Level ${level}` )
    level = level+ parseInt(1)

    
 }

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    },200)
}

