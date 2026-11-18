canvas = document.getElementById("game")
ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, 320, 180)

inputs = {jump: [" ", "W", "w", "ArrowUp"], left: ["a", "A", "ArrowLeft"], right: ["d", "D", "ArrowRight"]}


class Platform {
    
    constructor(this_x, this_y, this_width, this_height) {
        this.fillRectReqs = {
        x: this_x,
        y: this_y,
        width: this_width,
        height: this_height
    }
        this.edges = {
            left: this.fillRectReqs.x,
            right: this.fillRectReqs.x + this.fillRectReqs.width,
            top: this.fillRectReqs.y,
            bottom: this.fillRectReqs.y + this.fillRectReqs.height,
    }
    }

    draw() {
        ctx.fillStyle = 'gray'
        ctx.fillRect(this.fillRectReqs.x, this.fillRectReqs.y, this.fillRectReqs.width, this.fillRectReqs.height)
    }
    
}

const Platforms = [
    new Platform(0, 140, 80, 10),
    new Platform(100, 110, 70, 10),
    new Platform(200, 80, 70, 10)
]

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

        this.edges = {
            left: this.position.x,
            right: this.position.x + this.dimensions.width,
            top: this.position.y,
            bottom: this.position.y + this.dimensions.height,
        }

        this.movement = {
            left: false,
            right: false
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
                this.velocity.y = 0
                }
            }
            })
        }

        move() {
            window.addEventListener("keydown", (event) => {
                if (inputs.left.includes(event.key)) {
                    this.velocity.x = -2
                    this.movement.left = true
                }
            })

            window.addEventListener("keyup", (event) => {
                if (inputs.left.includes(event.key)) {
                    this.movement.left = false
                }
            })

            window.addEventListener("keydown", (event) => {
                if (inputs.right.includes(event.key)) {
                    this.velocity.x = 2
                    this.movement.right = true
                }
            })

            window.addEventListener("keyup", (event) => {
                if (inputs.right.includes(event.key)) {
                    this.movement.right = false
                }
            })
        }

        draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        }
        
        update(deltaTime) {
        this.edges.top = this.position.y
        this.edges.bottom = this.position.y + this.dimensions.height
        this.edges.left = this.position.x
        this.edges.right = this.position.x + this.dimensions.width

        const beginningBottom = this.edges.bottom
        const nextBottom = this.edges.bottom + this.velocity.y
        
        this.velocity.y += this.physics.gravity
        if (this.velocity.y > this.physics.terminalVelo) {
            this.velocity.y = this.physics.terminalVelo
        }
        
        platforms.forEach(platform =>{
            if (this.velocity.y > 0 &&
            nextBottom >= platform.edges.top && 
            this.edges.right >= platform.edges.left &&
            this.edges.left <= platform.edges.right &&
            this.edges.top <= platform.edges.bottom &&
            beginningBottom <= platform.edges.top) {
                
            this.velocity.y = 0
            this.position.y = platform.fillRectReqs.y - this.dimensions.height
            this.onFloor = true
            this.coyote.timer = 100
        } else {
            this.onFloor = false
            this.coyote.timer -= deltaTime
            this.coyote.timer = Math.max(this.coyote.timer, 0)
        }
        })
        

        if (this.movement.left) {
                this.velocity.x = -2
            } else if (this.movement.right) {
                this.velocity.x = 2
            } else {
                this.velocity.x = 0
            }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y    
        }



        
}

const player_body = new Player
let lastTime = 0

player_body.jump()
player_body.move()

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
    platforms.forEach(platform => platform.draw())
}

gameLoop()

