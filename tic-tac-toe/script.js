let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let msgContainer2 = document.querySelector(".msg-container2");
let msg2 = document.querySelector("#msg2");
let newBtn2 = document.querySelector("#newgame2");

let turn0 = true;

let boxCount = 0;

const winPatterns = [
    [0 ,1 ,2 ],
    [3 ,4 ,5 ],
    [6 ,7 ,8 ],
    [0 ,3 ,6 ],
    [1 ,4 ,7 ],
    [2 ,5 ,8 ],
    [0 ,4 ,8 ],
    [2 ,4 ,6 ]
];

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        boxCount++;
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msgContainer2.classList.add("hide");
    boxCount = 0;
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showDraw = () => {
    msg2.innerText = "Oops It Is Draw";
    msgContainer2.classList.remove("hide");
    disableBoxes();
}
const showWinner = (winner) => {
    msg.innerText = `Congrats - Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    if(boxCount == 9){
        showDraw();
    }
    else{
        for(let pattern of winPatterns){
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;

            if(pos1 != "" && pos2 != "" && pos3 != ""){
                if(pos1 == pos2 && pos2 == pos3){
                    showWinner(pos1);
                }
            } 
        }
    }
};

resetBtn.addEventListener("click" , resetGame);
newBtn.addEventListener("click" , resetGame);
newBtn2.addEventListener("click" , resetGame);
