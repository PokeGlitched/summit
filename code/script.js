canvas = document.getElementById("game")
ctx = canvas.getContext("2d")

ctx.fillRect(0, 0, 320, 480)

let player_body = null
inputs = {jump: [" ", "W", "w", "ArrowUp"], left: ["a", "A", "ArrowLeft"], right: ["d", "D", "ArrowRight"]}
let levelNum = 1

class Platform {
    
    constructor(this_x, this_y, this_width, this_height) {
        this.fillRectReqs = {
        x: this_x,
        y: this_y,
        width: this_width,
        height: this_height
    }
        this.edges = {
            left: this.fillRectReqs.x,
            right: this.fillRectReqs.x + this.fillRectReqs.width,
            top: this.fillRectReqs.y,
            bottom: this.fillRectReqs.y + this.fillRectReqs.height,
    }
    }

    draw() {
        ctx.fillStyle = 'gray'
        ctx.fillRect(this.fillRectReqs.x, this.fillRectReqs.y, this.fillRectReqs.width, this.fillRectReqs.height)
    }
    
}

let platforms = window.tiles.map(tile => 
    new Platform(tile.x, tile.y, tile.width, tile.height)
) 


window.updateGamePlatforms = function () {
    platforms = window.tiles.map(tile => 
    new Platform(tile.x, tile.y, tile.width, tile.height)
    )
}

fetch("levels/level1.json")
    .then(response => response.json())
    .then(levelData => {
        console.log("LEVEL LOADED:", levelData)
        const loadedPlats = levelData.platforms.map(tile => new Platform(tile.x, tile.y, tile.width, tile.height))
        platforms = loadedPlats
        window.spawnPos = {
            "x": levelData.spawn.x,
            "y": levelData.spawn.y
        }
        player_body = new Player
        player_body.jump()
        player_body.move()
        let lastTime = 0

        function gameLoop(timestamp) {
            
            const deltaTime = timestamp - lastTime
            lastTime = timestamp

            requestAnimationFrame(gameLoop)

            ctx.clearRect(0, 0, 320, 480)
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, 320, 480)

            player_body.update(deltaTime)
            player_body.draw()
            platforms.forEach(platform => platform.draw())
        }
        gameLoop()
    })
    .catch(error => {
        console.error("LOAD ERROR:", error)
    })
    

console.log(window.tiles)

class Player {
    constructor(){
        this.velocity = {
            x: 0,
            y: 0   
        }

        this.position = {
            x: window.spawnPos.x,
            y: window.spawnPos.y
        }

        this.dimensions = {
            width: 8,
            height: 8
        }

        this.physics = {
            gravity: 0.76,
            terminalVelo: 8
        }

        this.onFloor = false
        this.coyote = {
            time: 100,
            timer: 0
        }

        this.edges = {
            left: this.position.x,
            right: this.position.x + this.dimensions.width,
            top: this.position.y,
            bottom: this.position.y + this.dimensions.height,
        }

        this.movement = {
            left: false,
            right: false
        }
        }

    jump() {
            window.addEventListener("keydown", (event) => {
            if (this.coyote.timer > 0) {
                if (!event.repeat) {
                if (inputs.jump.includes(event.key)) {
                this.velocity.y = -10
                }
            }}
            })

            window.addEventListener("keyup", (event) => {
                if (inputs.jump.includes(event.key)) {
                    if (this.velocity.y < 0) {
                this.velocity.y *= 0.5
                }
            }
            })
        }

    move() {
            window.addEventListener("keydown", (event) => {
                if (inputs.left.includes(event.key)) {
                    this.velocity.x = -2
                    this.movement.left = true
                }
            })

            window.addEventListener("keyup", (event) => {
                if (inputs.left.includes(event.key)) {
                    this.movement.left = false
                }
            })

            window.addEventListener("keydown", (event) => {
                if (inputs.right.includes(event.key)) {
                    this.velocity.x = 2
                    this.movement.right = true
                }
            })

            window.addEventListener("keyup", (event) => {
                if (inputs.right.includes(event.key)) {
                    this.movement.right = false
                }
            })
        }

    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        }
        
    update(deltaTime) {
        this.edges.top = this.position.y
        this.edges.bottom = this.position.y + this.dimensions.height
        this.edges.left = this.position.x
        this.edges.right = this.position.x + this.dimensions.width

        const beginningBottom = this.edges.bottom
        const beginningTop = this.edges.top
        const nextBottom = this.edges.bottom + this.velocity.y
        const nextTop = this.edges.top + this.velocity.y;
        
        this.velocity.y += this.physics.gravity
        if (this.velocity.y > this.physics.terminalVelo) {
            this.velocity.y = this.physics.terminalVelo
        }
        
        this.onFloor = false
        this.coyote.timer -= deltaTime
        this.coyote.timer = Math.max(this.coyote.timer, 0)
        
        if (this.movement.left) {
                this.velocity.x = -2
            } else if (this.movement.right) {
                this.velocity.x = 2
            } else {
                this.velocity.x = 0
            }

        platforms.forEach(platform =>{
            if (this.velocity.y > 0 &&
            nextBottom >= platform.edges.top && 
            this.edges.right >= platform.edges.left &&
            this.edges.left <= platform.edges.right &&
            this.edges.top <= platform.edges.bottom &&
            beginningBottom <= platform.edges.top) {
                
            this.velocity.y = 0
            this.position.y = platform.fillRectReqs.y - this.dimensions.height
            this.onFloor = true
            this.coyote.timer = 100
            }

            if (this.edges.right + this.velocity.x >= platform.edges.left &&
                this.edges.left + this.velocity.x <= platform.edges.right &&
                this.edges.bottom > platform.edges.top &&
                this.edges.top < platform.edges.bottom) {
                    this.velocity.x = 0
                }
            
            if (this.velocity.y < 0 &&
                beginningTop >= platform.edges.bottom &&
                nextTop <= platform.edges.bottom &&
                this.edges.right >= platform.edges.left &&
                this.edges.left <= platform.edges.right) {

                this.velocity.y = 0;
                this.position.y = platform.edges.bottom;
                }
        })


            if (this.edges.bottom >= canvas.height ||
                this.edges.right <= 0 ||
                this.edges.left >= canvas.width
            ) {
                this.position.x = window.spawnPos.x
                this.position.y = window.spawnPos.y
            }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y    
        }



        
}



