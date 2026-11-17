canvas = document.getElementById("game")
ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, 320, 180)

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
            width: 32,
            height: 48
        }

        this.gravity = 0.5
        }


        draw() {
        this.fillStyle = 'red'
        this.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        }
        
        update() {
        this.position.x += this.velocity.x

        this.velocity += this.gravity
        this.position.y += this.velocity.y
        }
}

const player_body = new Player

function gameLoop() {
    requestAnimationFrame(gameLoop)
    ctx.clearRect(0, 0, 320, 180)
    ctx.fillRect(0, 0, 320, 180)
    player_body.update()
    player_body.draw()
}

gameLoop()

