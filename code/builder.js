builderCanvas = document.getElementById("builder")
builderCtx = builderCanvas.getContext("2d")


let clicking = false;
const gridSize = 16;
let preview = {x: 0, y: 0, width: 0, height: gridSize};
let startOClick = {x: 0, y: 0};


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
    builderCtx.fillRect(startOClick.x, startOClick.y, gridSize, gridSize)
    
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


    builderCtx.fillStyle = "grey"
    tiles.forEach(tile => {
        builderCtx.fillRect(tile.x, tile.y, tile.width, tile.height)
    })
    
    preview = {
        x: Math.min(endxcoord, startOClick.x),
        y: startOClick.y,
        width: Math.abs(endxcoord - startOClick.x),
        height: gridSize
    }

    builderCtx.fillRect(preview.x, preview.y, preview.width, preview.height)

});

builderCanvas.addEventListener("mouseup", () => {
    if (!clicking) return;

    if (preview.width >= gridSize) {
        tiles.push({...preview});
    }

    clicking = false;
});
