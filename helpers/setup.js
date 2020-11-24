import { scoreCardService }  from '../models/scorecard'

const initializeScorecardList = () => {
  let game1 = new scoreCardService(
    'Skull King',
    'This is the card game skull king, 10 rounds!',
    1,
    10,
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  )
  let game2 = new scoreCardService(
    'Rummy',
    'This is the card game rummy, 5 rounds!',
    1,
    5,
    ['1', '2', '3', '4', '5']
  )
  let game3 = new scoreCardService(
    'Hearts',
    'This is the card game Hearts, 4 rounds!',
    1,
    4,
    ['1', '2', '3', '4']
  )
  let game4 = new scoreCardService(
    'Cartographers',
    'This is the game cartographers, 4 rounds!',
    1,
    16,
    ['A', 'B', 'Coins', 'Goblins', 'B', 'C', 'Coins', 'Goblins', 'C', 'D', 'Coins', 'Goblins', 'D', 'A', 'Coins', 'Goblins']
  )
  let game5 = new scoreCardService(
    'Uno',
    'This is the card game uno, 7 rounds!',
    1,
    7,
    ['1', '2', '3', '4', '5', '6', '7']
  )
  return [game1, game2, game3, game4, game5]
}

module.exports = { initializeScorecardList }
