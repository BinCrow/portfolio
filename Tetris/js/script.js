import BLOCKS from "./blocks.js"
//DOM
const playground = document.querySelector(".playground > ul"),
gameText = document.querySelector(".game-text"),
scoreDisplay = document.querySelector(".score"),
restartbutton = document.querySelector(".game-text button");
//setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 800;
let downInterval;
//movingItem을 실행하기전 정보를 담아둔느 용도
let tempMovingItem;

//다음 블록의 타입과 정보를 가지고있는 변수
const movingItem = {
    type: "",
    direction: 3,
    top: 0,
    left: 0,
}

init()

//functions
function init(){
    tempMovingItem = { ...movingItem };
    for(let i = 0; i < GAME_ROWS; i++) {
        prependNewLine()
    }
    generateNewBlock()
}

//반복문을 통해서 만들어진 게임의 레이아웃
function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul")
    for(let j = 0; j < GAME_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    playground.prepend(li)
}
function renderBlocks( moveType = "" ){
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block=>{
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvaliable = checkEmptyy(target);
        if(isAvaliable){
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem }
            if(moveType === 'retry'){
                clearInterval(downInterval)
                showGameoverText()
            }
            setTimeout(()=>{
                renderBlocks('retry');
                if(moveType === "top"){
                    seizeBlock();
                }
            },0);
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMahct()
}

function checkMahct(){

    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li=>{
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })
        if(matched){
            child.remove();
            prependNewLine()
            score++;
            scoreDisplay.innerText = score; 
        }
    })
    generateNewBlock()
}

function generateNewBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock('top', 1)
    },duration)
    
    const blockArray = Object.entries(BLOCKS);
    const rendomIndex = Math.floor(Math.random() * blockArray.length)
    movingItem.type = blockArray[rendomIndex][0];
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks()
}

function checkEmptyy(target){
    if(!target || target.classList.contains("seized")){
        return false;
    }
    return true;
}

function moveBlock(moveType, amount){
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
}

function chageDirection(){
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks()
}

function dropBlock(){
    clearInterval(downInterval);
    downInterval = setInterval(()=>{
        moveBlock("top", 1)
    },10)
}
function showGameoverText(){
    gameText.style.display = "flex"
}

//event handling
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 38:
            chageDirection();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
})

restartbutton.addEventListener("click", ()=>{
    playground.innerHTML = "";
    gameText.style.display = "none";
    init()
})