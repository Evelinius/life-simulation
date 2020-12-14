


function create2DArray(n, m) {
    field = new Array(n)
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(m)
    }
    return field
}

function createRandomState() {
    let seed = 0
    let randomState = 0
    seed = Math.random()

    if (seed < 0.5) {
        randomState = 0
    }
    if (seed >= 0.5) {
        randomState = 1
    }
    return randomState
}

function fieldGenerator(n, m) {
    let field = create2DArray(n, m)

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const randomState = createRandomState()
            field[i][j] = randomState
        }
    }

    return field
}

function getNeighbors(field, i, j) {
    const neighbors = new Array()
    const width = field.length - 1
    const height = field[0].length - 1

    if (i > 0 && j > 0) {
        neighbors.push(field[i - 1][j - 1])
    }
    if (j > 0) {
        neighbors.push(field[i][j - 1])
    }
    if (i < width && j > 0) {
        neighbors.push(field[i + 1][j - 1])
    }
    if (i < width) {
        neighbors.push(field[i + 1][j])
    }
    if (i < width && j < height) {
        neighbors.push(field[i + 1][j + 1])
    }
    if (j < height) {
        neighbors.push(field[i][j + 1])
    }
    if (i > 0 && j < height) {
        neighbors.push(field[i - 1][j + 1])
    }
    if (i > 0) {
        neighbors.push(field[i - 1][j])
    }
    return neighbors
}

function updateFieldState(field) {
    const height = field.length
    const width = field[0].length

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const neighbors = getNeighbors(field, i, j)
            var cell = field[i][j]
            const aliveNeighbors = neighbors.reduce((sum, el) => sum + el, 0)
            if (cell == 1) {
                if (aliveNeighbors > 3 || aliveNeighbors < 2) {
                    field[i][j] = 0
                }
            }
            if(cell == 0){
                if(aliveNeighbors == 3){
                    field[i][j] = 1
                }
            }
        }
    }
    return field
}
var field = fieldGenerator(25, 25)
setInterval(() => {
    drawGrid(field)
    field = updateFieldState(field)
    console.log(JSON.stringify(field))
}, 100)