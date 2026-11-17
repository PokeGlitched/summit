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
        }

        jump() {
            window.addEventListener("keydown", (event) => {
                if (inputs.jump.includes(event.key)) {
                this.velocity.y += -10
                }
            })
        }

        draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        }
        
        update() {
        this.position.x += this.velocity.x

        this.velocity.y += this.physics.gravity
        if (this.velocity.y > this.physics.terminalVelo) {
            this.velocity.y = this.physics.terminalVelo
        }
        this.position.y += this.velocity.y
        }
}


const player_body = new Player
player_body.jump()

function gameLoop() {
    requestAnimationFrame(gameLoop)
    ctx.clearRect(0, 0, 320, 180)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 320, 180)
    ctx.fillRect(0, 160, 320, 20)
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, 320, 180)
    player_body.update()
    player_body.draw()
}

gameLoop()

