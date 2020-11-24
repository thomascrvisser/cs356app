
class scoreCardService {
  constructor(title, description, playerCount, roundCount, roundNames) {
    this.title = title,
    this.description = description,
    this.grid = buildGrid(playerCount, roundCount, roundNames),
    this.defaultGrid = buildGrid(playerCount, roundCount, roundNames),
    this.playerCount = playerCount,
    this.roundCount = roundCount,
    this.roundNames = roundNames,
    this.playerNames = ['Players', '']
  }

  getGrid() {
    return this.grid
  }

  getDefaultGrid(){
    return this.defaultGrid
  }

  // addPlayer() {
  //   this.playerCount += 1
  //   let grid = this.grid
  //   grid.push([])
  //   for (let col = 0; col < this.roundCount; col++) {
  //     grid[this.playerCount].push(0)
  //   }
  //   console.log('adding a player grid')
  //   console.log(grid)
  //   return this.playerCount
  // }

  // removePlayer() {
  //   if (this.playerCount > 1) {
  //     this.playerCount -= 1
  //     this.grid = this.grid.pop()
  //   }
  //   return this.playerCount
  // }

  // saveGridValue(row, col, value) {
  //   this.grid[row][col] = value
  //   // console.log(this.grid)
  // }

  // reset(){
  //   this.playerCount = 1
  //   this.playerNames = []
  //   return null
  // }

  // updatePlayerName(row, name) {
  //   this.playerNames[row] = name
  // }
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
