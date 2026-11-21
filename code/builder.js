builderCanvas = document.getElementById("builder")
builderCtx = builderCanvas.getContext("2d")


let clicking = false;
let startOClick = {x: 0, y: 0};
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

const tiles = []

builderCanvas.addEventListener("mousedown", (event) => {
    const rect = builderCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    startOClick.x = (Math.floor(x/gridSize)) * gridSize
    startOClick.y = (Math.floor(y/gridSize)) * gridSize

    clicking = true

    
});

builderCanvas.addEventListener("mousemove", (event) => {
    if (!clicking) return;
    
    const rect = builderCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const endxcoord = (Math.floor(x/gridSize)) * gridSize;
    const endycoord = (Math.floor(y/gridSize)) * gridSize;

    builderCtx.clearRect(0, 0, builderCanvas.width, builderCanvas.height)
    drawGrid()
    
    tiles.forEach(tile => {
        builderCtx.fillRect(tile.x, tile.y, gridSize, gridSize)
    })

    const preview = {
        width: endxcoord - startOClick.x,
        length: endycoord - startOClick.y
    }
});

