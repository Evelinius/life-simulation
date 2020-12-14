const canvas = document.getElementById('canvas')


const borderWidth = 5
const cellSize = 20

const drawCell = (n, m, cellType) => {

    const x = (n + 1) * borderWidth + n * cellSize
    const y = (m + 1) * borderWidth + m * cellSize

    if (cellType == 1) {
        ctx.fillStyle = "#FFCC00"
    }
    if (cellType == 0) {
        ctx.fillStyle = "gray"
    }
    ctx.fillRect(x, y, cellSize, cellSize)
}

const ctx = canvas.getContext("2d")

drawGrid = (field) => {
    const height = field[0].length * (borderWidth  + cellSize) + borderWidth
    const width = field.length * (borderWidth  + cellSize) + borderWidth

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, width, height)
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            drawCell(i, j, field[i][j])
        }

    }
}