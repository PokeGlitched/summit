builderCanvas = document.getElementById("builder")
builderCtx = builderCanvas.getContext("2d")


let clicking = false;
const gridSize = 16;
let preview = {x: 0, y: 0, width: 0, height: gridSize};
let startOClick = {x: 0, y: 0};
let placeMode = document.getElementById("mode")
let currentTool = "platform"
placeMode.addEventListener("change", () => {
    currentTool = placeMode.value
    console.log(currentTool)
})

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

window.spawnPos = {
    "x": 0,
    "y": 0
}

window.endingPs = {
    "x": 0,
    "y": 0,
    "width": 16,
    "height": 16
}

builderCanvas.addEventListener("mousedown", (event) => {
    const rect = builderCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const clickX = Math.floor(x / gridSize) * gridSize;
    const clickY = Math.floor(y / gridSize) * gridSize;
    if (currentTool === "platform") {
    
    const tileIndex = tiles.findIndex(tile =>
        clickX >= tile.x &&
        clickX < tile.x + tile.width &&
        clickY >= tile.y &&
        clickY < tile.y + tile.height
        );

    if (tileIndex !== -1) {
        tiles.splice(tileIndex, 1)
        builderCtx.clearRect(0, 0, builderCanvas.width, builderCanvas.height)
        drawGrid()
        drawPlatforms()
        window.updateGamePlatforms()
        return;
    }

    startOClick.x = clickX
    startOClick.y = clickY
    clicking = true

    preview = {
        x: 0,
        y: 0,
        width: 0,
        height: gridSize
    }
    

    } else if (currentTool === "spawnPos") {
        const oldSpawnPos = {
            "x": window.spawnPos.x,
            "y": window.spawnPos.y
        }
        window.spawnPos.x = clickX + 4
        window.spawnPos.y = clickY + 4
        
        if (window.spawnPos) {
            builderCtx.clearRect(oldSpawnPos.x, oldSpawnPos.y, 8, 8)
            drawGrid()
            drawPlatforms()
        }
        builderCtx.fillStyle = "royalblue"
        builderCtx.fillRect(window.spawnPos.x, window.spawnPos.y, 8, 8)
    } else if (currentTool === "endingPs") {
        const oldEndPos = {
            "x": window.endingPs.x,
            "y": window.endingPs.y
        }
        window.endingPs.x = clickX
        window.endingPs.y = clickY
        
        if (window.endingPs) {
            builderCtx.clearRect(oldEndPos.x, oldEndPos.y, 16, 16)
        }
        builderCtx.fillStyle = "darkseagreen"
        builderCtx.fillRect(window.endingPs.x + 1, window.endingPs.y + 1, gridSize - 2, gridSize - 2)
        drawGrid()
        drawPlatforms()
    }
});

function drawPlatforms() {
    builderCtx.fillStyle = "grey"
    tiles.forEach(tile => {
        builderCtx.fillRect(tile.x, tile.y, tile.width, tile.height)
    })
    builderCtx.fillStyle = "royalblue"
    builderCtx.fillRect(window.spawnPos.x, window.spawnPos.y, 8, 8)
    builderCtx.fillStyle = "darkseagreen"
    builderCtx.fillRect(window.endingPs.x + 1, window.endingPs.y + 1, gridSize - 2, gridSize - 2)
}

builderCanvas.addEventListener("mousemove", (event) => {
    if (currentTool === "platform") {
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
    }
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


const lvlSaveBtn = document.getElementById("save")

lvlSaveBtn.addEventListener("click", () => {

    const levelData = {
    platforms: window.tiles
    }
    const json = JSON.stringify(levelData, null, 2)
    const levelFile = new Blob([json], {
        type: "application/json"
    })

    const lvlSave = document.createElement("a")
    lvlSave.href = URL.createObjectURL(levelFile)
    lvlSave.download = "level.json"
    lvlSave.click()
})

const lvlLoadBtn = document.getElementById("load")
const lvlInput = document.getElementById("levelFile")


lvlLoadBtn.addEventListener("click", () => {
    lvlInput.click()
})

lvlInput.addEventListener("change", () => {
    const currentlvl = lvlInput.files[0]
    
    if (currentlvl) {
        const lvlReader = new FileReader()
        lvlReader.onload = () => {
            const levelData = JSON.parse(lvlReader.result)

            tiles.splice(0, tiles.length, ...levelData.platforms)

            builderCtx.clearRect(0, 0, builderCanvas.width, builderCanvas.height)
            drawGrid()
            drawPlatforms()
            window.updateGamePlatforms()
        }

        lvlReader.readAsText(currentlvl)

    }
})