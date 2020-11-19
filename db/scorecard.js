
class scoreCardService {
  constructor(title, description, playerCount = 1, roundCount = 1, roundNames = ['1']) {
    this.title = title,
    this.description = description,
    this.grid = buildGrid(playerCount, roundCount, roundNames),
    this.playerCount = playerCount,
    this.roundCount = roundCount,
    this.roundNames = roundNames,
    this.playerNames = []
  }

  addPlayer() {
    this.playerCount += 1
    return this.playerCount
  }

  removePlayer() {
    if (this.playerCount > 1) {
      this.playerCount -= 1
    }
    return this.playerCount
  }

  saveGridValue(row, col, value) {
    this.grid[row][col] = value
    console.log(this.grid)
  }

}

const buildGrid = (playerCount, roundCount, roundNames) => {
  let grid = []
  for (let row = 0; row <= playerCount; row++) {
    grid.push([])
    for (let col = 0; col < roundCount; col++) {
      if (row == 0) {
        grid[row].push(roundNames[col])
      } else {
        grid[row].push(0)
      }
    }
  }

  return grid
}

export { scoreCardService }
