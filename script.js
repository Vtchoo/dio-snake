const canvas = document.getElementById("snake")
const c = canvas.getContext("2d")
const box = 32

document.addEventListener('keydown', updateDirection)

const snake = [{ x: 8 * box, y: 8 * box }]

let direction = 'R' // L, U and D

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function drawBG() {
    c.fillStyle = 'lightgreen'
    c.fillRect(0, 0, 16 * box, 16 * box)
}

function drawSnake() {
    
    snake.forEach(section => {
        c.fillStyle = 'green'
        c.fillRect(section.x, section.y, box, box)
    })
}

function drawFood() {
    c.fillStyle = 'red'
    c.fillRect(food.x, food.y, box, box)
}

function drawFrame() {

    snake.forEach(section => {
        if (section == snake[0])
            return
        
        if (section.x == snake[0].x && section.y == snake[0].y) {
            clearInterval(game)
            alert('Game over')
        }
            
    })

    drawBG()
    drawFood()
    drawSnake()

    let x = snake[0].x
    let y = snake[0].y

    if (direction == 'R') x += box
    if (direction == 'L') x -= box
    if (direction == 'U') y -= box
    if (direction == 'D') y += box

    if(!(snake[0].x == food.x && snake[0].y == food.y))
        snake.pop()
    else
        food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box }
    
    snake.unshift({ x, y })
}

function updateDirection(e) {
    buttonEvent[e.key]()
}

const buttonEvent = {
    'ArrowLeft': () => { if (direction != 'R') direction = 'L' },
    'ArrowRight': () => { if (direction != 'L') direction = 'R' },
    'ArrowUp': () => { if (direction != 'D') direction = 'U' },
    'ArrowDown': () => { if (direction != 'U') direction = 'D' }
}

const game = setInterval(drawFrame, 300)