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
    }
}


function gameLoop() {
    requestAnimationFrame(gameLoop)
    ctx.clearRect(0, 0, 320, 180)
    ctx.fillRect(0, 0, 320, 180)
}

gameLoop()

