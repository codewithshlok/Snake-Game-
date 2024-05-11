// game constants  and  variables
let inputdir = { x: 0, y: 0 }
let foodsound = new Audio("food.mp3")
let gameoversound = new Audio("gameover.mp3")
let movesound = new Audio("move.mp3")
let musicsound = new Audio("music.mp3")
let speed = 0.20;
let score = 0
let lastpaintime = 0
let snakearr = [
    { x: 15, y: 16 }
]
let food = {
    x: 6, y: 7
}
let hiscoreval;

// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintime) / 100 < 1 / speed) {
        return;
    }
    lastpaintime = ctime
    gameEngine();
    // console.log(ctime)

}
function iscollide(snake) {
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    // if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }

}
function gameEngine() {
    // Part 1: Updating the snake array
    if (iscollide(snakearr)) {
        gameoversound.play()
        musicsound.pause()
        inputdir = { x: 0, y: 0 }
        alert("Game Over, Press any key to Continue!")
        let snakearr = [
            { x: 15, y: 16 }
        ]
        // musicsound.play()
        score = 0;
    }

    // If Snake have eaten the food increment the score and regenerate the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play()
        score += 1
        if (score > hiscoreval) {
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscorebox.innerHTML = "High Score: " + hiscoreval

        }
        scorebox.innerHTML = "Score: " + score
        speed += 0.1
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        const element = snakearr[i];
        snakearr[i + 1] = { ...snakearr[i] }

    }
    snakearr[0].x += inputdir.x
    snakearr[0].y += inputdir.y



    // Part 2: render the sanke and food 
    // displaying the snake
    board.innerHTML = ""
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })
    // displaying the food
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}

let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore)
    hiscorebox.innerHTML = "High Score: " + hiscore
}


// main logic starts here



window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputdir = { x: 0, y: 1 } // Start the game
    movesound.play()
    switch (e.key) {
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
})



