let userSore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#message");

const yScore = document.querySelector("#YouScore");
const cScore = document.querySelector("#CompScore");

const genComp = () => {
    const options = ["rock","paper","scissor"];
    const genIdx = parseInt(Math.random() * 3);
    return options[genIdx];
}

const drawGame = (choiceId) => {
    console.log("draw");
    msg.innerText = "Draw , Play Again => " + " Both Selected " + choiceId;
    msg.style.backgroundColor = "black";
}

const showWinner = (userWin, choiceId, compChoice) => {
    if(userWin){
        userSore++;
        yScore.innerText = userSore;
        console.log("won");
        msg.innerText = "You Win! => " + choiceId + " beat " + compChoice;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        cScore.innerText = compScore;
        console.log("lost");
        msg.innerText = "You lose. => " + compChoice + " beat " + choiceId;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (choiceId) => {
    const compChoice = genComp();
    console.log("move taken by comp is " + compChoice);

    if(choiceId === compChoice){
        drawGame(choiceId);
    }
    else{
        let userWin = true;
        if(choiceId === "rock"){
            userWin = compChoice === "paper" ? false : true;
        }
        else if(choiceId === "paper"){
            userWin = compChoice === "scissor" ? false : true;
        }
        else{
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, choiceId, compChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const choiceId = choice.getAttribute("id");
        console.log("move taken is " + choiceId);
        playGame(choiceId);
    })
})