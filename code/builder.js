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

window.tiles = []

builderCanvas.addEventListener("mousedown", (event) => {
    const rect = builderCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const clickX = Math.floor(x / gridSize) * gridSize;
    const clickY = Math.floor(y / gridSize) * gridSize;

    console.log("Clicked:", clickX, clickY);
    console.log("Tiles:", tiles);

    const tileIndex = tiles.findIndex(tile =>
        clickX >= tile.x &&
        clickX <= tile.x + tile.width **
        clickY >= tile.y &&
        clickY <= tile.y + tile.height
    );

    if (tileIndex !== -1) {
        tiles.splice(tileIndex, 1);
        builderCtx.clearRect(0, 0, builderCanvas.width, builderCanvas.height)
        drawGrid()
        drawPlatforms()
        window.updateGamePlatforms()
        return;
    }

    startOClick.x = clickX
    startOClick.y = clickY

    clicking = true
    builderCtx.fillRect(startOClick.x, startOClick.y, gridSize, gridSize)

    preview = {
        x: 0,
        y: 0,
        width: 0,
        height: gridSize
    }
});

function drawPlatforms() {
    builderCtx.fillStyle = "grey"
    tiles.forEach(tile => {
        builderCtx.fillRect(tile.x, tile.y, tile.width, tile.height)
    })
    
}

builderCanvas.addEventListener("mousemove", (event) => {
    if (!clicking) return;
    
    const rect = builderCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const endxcoord = (Math.floor(x/gridSize)) * gridSize;

    builderCtx.clearRect(0, 0, builderCanvas.width, builderCanvas.height)
    drawGrid()
    drawPlatforms()
    
    builderCtx.fillStyle = "lightgrey"
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

    if (preview.width === 0) {
        preview.x = startOClick.x,
        preview.y = startOClick.y,
        preview.width = gridSize
    }

    tiles.push({...preview});
    drawPlatforms()

    clicking = false;

    window.updateGamePlatforms()
}); 
