  
  const createInitialScoreCard  = (title, description, playerCount = 1, roundCount = 1, roundNames = ['1']) => {
    return {
      title,
      description,
      grid: buildGrid(playerCount, roundCount, roundNames),
      playerCount,
      roundCount,
      roundNames
    }
  }

  const addPlayer = (scorecard) => {
    console.log('adding a player')
    console.log(scorecard.playerCount)
    scorecard.playerCount += 1
    console.log(scorecard.playerCount)
    console.log('finished adding players')
    return scorecard.playerCount
  }

  const removePlayer = (scorecard) => {
    if (scorecard.playerCount > 1) {
      scorecard.playerCount -= 1
    }
  }

  const addRound = (scorecard) => {
    scorecard.roundCount += 1
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


const scoreCardService = () => {
  return {
    title: null,
    description: null,
    grid: null,
    playerCount: null,
    roundCount: null,
    playerNames: null,
    roundNames: null
  }
}

scoreCardService.createInitialScoreCard = createInitialScoreCard
scoreCardService.addPlayer = addPlayer
scoreCardService.addRound = addRound
scoreCardService.removePlayer = removePlayer

export {
  scoreCardService
}
