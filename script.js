canvas = document.getElementById("game")
ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, 320, 180)


function gameLoop() {
    requestAnimationFrame(gameLoop)
}

gameLoop()

