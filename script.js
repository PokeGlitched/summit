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
        }

        jump() {
            window.addEventListener("keydown", (event) => {
            if (this.onFloor) {
                
                if (inputs.jump.includes(event.key)) {
                this.velocity.y = -10
                }
            }
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
        
        update() {
        

        this.velocity.y += this.physics.gravity
        if (this.velocity.y > this.physics.terminalVelo) {
            this.velocity.y = this.physics.terminalVelo
        }
        
        
        if (this.position.y + this.dimensions.height >= 160 && this.velocity.y > 0) {
            this.velocity.y = 0
            this.position.y = 160 - this.dimensions.height
            this.onFloor = true
        } else {
            this.onFloor = false
        }

        this.position.x += this.velocity.x
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
    
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 160, 320, 20)
    player_body.update()
    player_body.draw()
}

gameLoop()

