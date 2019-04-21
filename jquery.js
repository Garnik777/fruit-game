var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['apple','apricot','bananas','cherry','grapes',
'lemon','orange','pera','pineapple','watermelon'];
$(function(){
$("#startreset").click(function(){
    //we are playing
    if(playing==true){
        //reload page
        location.reload();
    }else{
       // we are not palying
       playing= true;//game initiated

       score = 0;
       $("#scorevalue").html(score);
        //show trial left
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();
        $("#gameOver").hide();
        //change button text 
        $("#startreset").html("Reset Game");
    
        //srart sending fruits
        startAction();
    }
});
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);//update scoree
    $("#sound")[0].play();
    //stop fruit
    clearInterval(action);
    //hide fruit
    $("#fruit1").hide("explode",500);//slice fruit

    //send new fruits
    setTimeout(startAction,500)
    

})

function addHearts(){
    $("#trialsLeft").empty();
    for(var i = 0;i <trialsLeft;i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction(){
    //generate a fruit
    $("#fruit1").show();
    chooseFruit();//choose a random fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50})
    //random postion

    step=1+Math.round(5*Math.random());//change step
    //move fruit down by one step
    action=setInterval(function(){
        $("#fruit1").css('top',$("#fruit1").position().top + step);

        //chek if fruit is too low
        if($("#fruit1").position().top>$("#fruitsContainer").height()){
                //check if we have trials left
                if(trialsLeft>1){
                     //generate a fruit
    $("#fruit1").show();
    chooseFruit();//choose a random fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()), 'top':-50})
    //random postion

    step=1+Math.round(5*Math.random());//change step
                    //reduce trials
                    trialsLeft--;
                    addHearts();
                }else{//game over
                    playing = false;
                    $("#startreset").html("Start Game");//change button to start game
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is '+score+'</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
        }

    },10)
}

//generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src','images/'+fruits[Math.round(9*Math.random())]+'.png');
    
}
//stop dropin fruits
function stopAction(){
    clearInterval(action);
    $("fruit1").hide();
}