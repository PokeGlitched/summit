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

const tiles = []

builderCanvas.addEventListener("click", function(event) {
    const rect = builderCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const boxxcoord = (Math.floor(x/gridSize)) * gridSize
    const boxycoord = (Math.floor(y/gridSize)) * gridSize

    const existingTile = tiles.findIndex(tile => 
        tile.x === boxxcoord && tile.y === boxycoord
    );

    if (existingTile !== -1) {
        tiles.splice(existingTile, 1)
    } else {
        tiles.push({ x: boxxcoord, y: boxycoord });
    }

    builderCtx.clearRect(0, 0, builderCanvas.width, builderCanvas.height);
    drawGrid();

    tiles.forEach(tile => {
        builderCtx.fillRect(tile.x, tile.y, gridSize, gridSize);
    });
    
    
});

