var fs = require('fs')

filePath = process.argv[2]

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

var contents = fs.readFileSync(filePath, 'utf8')
const field = JSON.parse(contents).field
setInterval(() => {
    console.log(JSON.stringify(field))
    updateFieldState(field)
}, 1000)