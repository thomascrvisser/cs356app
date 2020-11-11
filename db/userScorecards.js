const testUser1 = [
  {name: 'Skull King'},
  {name: 'Nines'},
  {name: 'Phase Ten'}
]

const skullKingScorecard = {
  title: 'Skull King',
  description: 'This is the skull king game!',
  players: ['p1', 'p2', 'p3', 'p4'],
  headers: ['Players', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  grid: [
    ['Players', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

const ninesScorecard = {
  title: 'Nines',
  description: 'This is the nines card game!',
  players: 3,
  headers: ['Players', '1', '2', '3', '4', '5', '6'],
  grid: [
    ['Players', '1', '2', '3', '4', '5', '6'],
    ['', 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0]
  ]
}

module.exports = {
  testUser1,
  skullKingScorecard,
  ninesScorecard
}
