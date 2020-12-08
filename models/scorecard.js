
class scoreCardService {
  constructor(title, description, roundCount, roundNames) {
    this.title = title,
    this.description = description,
    this.grid = buildGrid(roundCount, roundNames),
    this.playerCount = 0,
    this.roundCount = roundCount,
    this.roundNames = roundNames,
    this.playerNames = ['Players']
  }

  getGrid() {
    return this.grid
  }
}

const buildGrid = (roundCount, roundNames) => {
  let grid = []
  for (let row = 0; row <= 0; row++) {
    grid.push([])
    for (let col = 0; col < roundCount; col++) {
        grid[row].push(roundNames[col])
    }
  }

  return grid
}

export { scoreCardService }
