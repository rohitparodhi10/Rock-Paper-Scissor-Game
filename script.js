// create two variables for user score and comp score

let userScore=0;
let compScore=0;
let drawScore=0;

// access our HTML here 

let choices=document.querySelectorAll(".choice");
let message=document.querySelector("#msg");
let userScoreUpdate=document.querySelector("#user-score");
let compScoreUpdate=document.querySelector("#comp-score");
let drawScoreUpdate=document.querySelector("#draw-score");
let finalWin=document.querySelector("#winner");
let finalLose=document.querySelector("#lose");
let body=document.querySelector("body");

// alert("The first person to reach 20 points will be the winner!");

// sound effect choices

const sound=new Audio();
sound.src="click.mp3";

// sound effect winner

const winSound=new Audio();
winSound.src="win.mp3";

// sound effect lose

const loseSound=new Audio();
loseSound.src="lose.mp3";

// sound effect draw

const drawSound=new Audio();
drawSound.src="draw.mp3";

// score sound

const scoreSound=new Audio();
scoreSound.src="score.mp3";


// By utilizing a 'for each' access approach and employing event listeners, 
// we can retrieve the attributes of choices and pass them to the 'playGame' function
choices.forEach((choice)=>{
    choice.addEventListener("click", ()=>{
        const userChoice=choice.getAttribute("id");
        console.log("user choice is", userChoice);
        playGame(userChoice);
        sound.play();

    });
});


// we genrate the random computer choice using math function
// and pass our choices in array to random genrated index
const genCompChoice=()=>{
    const options=["Rock", "Paper", "Scissor"];
    const RandomIdx=Math.floor(Math.random()*3);// to genrate numbers in between 0-2.
    return options[RandomIdx];
}




// in this function we track user choice and track computer choice and check 
// choices using conditional statement

const playGame=(userChoice)=>{
    const compChoice=genCompChoice();
    console.log("com choice ", compChoice);
    if (userChoice===compChoice){
        //Draw game
        drawGame();
    }else{
        let userWinnner=true;
        if(userChoice==="Rock"){
            // comp choice will be paper or scissor
            userWinnner=compChoice==="Paper" ? false : true ;
        }else{
            if(userChoice==="Paper"){
                // comp choice will be rock or scissor
                userWinnner=compChoice==="Scissor" ? false : true ;
            }else{
                //now only user had one choice scissor
                userWinnner=compChoice==="Rock" ? false : true ;
            }
        }
        showWinner(userWinnner, userChoice, compChoice);
    }


    // diffrent way 


    // if(userChoice===compChoice){
    //     drawGame();
    // }else{
    //     let userWinnner=true;
    //     if(userChoice==="rock" && compChoice==="scissor" ||
    //         userChoice==="paper" && compChoice==="rock" ||
    //         userChoice==="scissor" && compChoice==="paper"    
    //     ){
    //         showWinner(true, userChoice, compChoice);
    //     }else{
    //         showWinner(false, userChoice,compChoice);
    //     }

    // }

}


// create draw game function

const drawGame=()=>{
    drawSound.play();
    drawScore++;
    drawScoreUpdate.innerText=drawScore;
    message.innerText="Game was Draw. Play Again!";
    message.style.backgroundColor="rgb(0, 0, 62)";
}

// update computer and user score and also update the message container


const showWinner=(userWinnner, userChoice, compChoice)=>{
    if(userWinnner){
        userScore++;
        userScoreUpdate.innerText=userScore;
        message.innerText=`You get point. Your ${userChoice} beats ${compChoice}`;
        message.style.backgroundColor="green";
        scoreSound.play();
    }else{
        scoreSound.play();
        compScore++;
        compScoreUpdate.innerText=compScore;
        message.innerText=`Computer get point. ${compChoice} beats your ${userChoice}`;
        message.style.backgroundColor="red";
    }
    if(userScore===20){
        finalWin.style.display="block";
        winSound.play();
        body.style.backgroundColor="green";

        setTimeout(function(){
            window.location.reload();
        },1500);
    }else{
        if(compScore===20){
            finalLose.style.display="block";
            loseSound.play();
            body.style.backgroundColor="red";
            setTimeout(function(){
                window.location.reload();
            },1500); 
        }
    }
}
