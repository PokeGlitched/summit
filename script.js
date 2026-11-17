canvas = document.getElementById("game")
ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, 320, 180)

inputs = {jump: [" ", "W", "w", "ArrowUp"]}

class Player {
    constructor(){
        this.velocity = {
            x: 0,
            y: 0   
        }

        this.position = {
            x: 0,
            y: 0
        }

        this.dimensions = {
            width: 12,
            height: 20
        }

        this.physics = {
            gravity: 0.5,
            terminalVelo: 8
        }

        this.onFloor = false
        this.coyote = {
            time: 100,
            timer: 0
        }
        }

        jump() {
            window.addEventListener("keydown", (event) => {
            if (this.coyote.timer > 0) {
                if (!event.repeat) {
                if (inputs.jump.includes(event.key)) {
                this.velocity.y = -10
                }
            }}
            })

            window.addEventListener("keyup", (event) => {
                if (inputs.jump.includes(event.key)) {
                    if (this.velocity.y < 0) {
                this.velocity.y *= 0.5
                }
            }
            })
        }

        draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        }
        
        update(deltaTime) {
              
        this.velocity.y += this.physics.gravity
        if (this.velocity.y > this.physics.terminalVelo) {
            this.velocity.y = this.physics.terminalVelo
        }
        
        
        if (this.position.y + this.dimensions.height >= 160 && this.velocity.y > 0) {
            this.velocity.y = 0
            this.position.y = 160 - this.dimensions.height
            this.onFloor = true
            this.coyote.timer = 100
        } else {
            this.onFloor = false
            this.coyote.timer -= deltaTime
            this.coyote.timer = Math.max(this.coyote.timer, 0)
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        }



        
}

class Platform {
    
    constructor(this_x, this_y, this_width, this_height) {
        this.fillRectReqs = {
        x: this_x,
        y: this_y,
        width: this_width,
        height: this_height
    }
    }

    draw() {
        ctx.fillStyle = 'gray'
        ctx.fillRect(this.fillRectReqs.x, this.fillRectReqs.y, this.fillRectReqs.width, this.fillRectReqs.height)
    }
    
}

const platform_1 = new Platform(50, 120, 80, 10)
const player_body = new Player
let lastTime = 0

player_body.jump()

function gameLoop(timestamp) {
    
    const deltaTime = timestamp - lastTime
    lastTime = timestamp

    requestAnimationFrame(gameLoop)

    ctx.clearRect(0, 0, 320, 180)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 320, 180)
    
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 160, 320, 20)
    player_body.update(deltaTime)
    player_body.draw()
    platform_1.draw()
}

gameLoop()

