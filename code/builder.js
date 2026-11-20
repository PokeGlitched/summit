builderCanvas = document.getElementById("builder")
builderCtx = builderCanvas.getContext("2d")

const gridSize = 16;

function drawGrid () {
    for (let i = 0; i < builderCanvas.width; i += gridSize) {
        builderCtx.beginPath()
        builderCtx.moveTo(i, 0)
        builderCtx.lineTo(i, builderCanvas.height)
        builderCtx.stroke()
    }

    for (let i = 0; i < builderCanvas.height; i += gridSize) {
        builderCtx.beginPath()
        builderCtx.moveTo(0, i)
        builderCtx.lineTo(builderCanvas.width, i)
        builderCtx.stroke()
    }
}

drawGrid()