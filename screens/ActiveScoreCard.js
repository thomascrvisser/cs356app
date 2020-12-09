import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { testUser1 } from '../db'
import { generalStyling } from '../helpers/styles'

export default class ActiveScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curScoreCard: null,
      title: '',
      grid: null,
      roundCount: 1,
      roundNames: ['1'],
      playerCount: 0,
      playerNames: [],
      leaderBoard: []
    }

    this.addPlayer = this.addPlayer.bind(this)
    this.removePlayer = this.removePlayer.bind(this)
    this.saveInputValue = this.saveInputValue.bind(this)
    this.savePlayerName = this.savePlayerName.bind(this)
    this.finishGame = this.finishGame.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('state changed')
  }

  componentDidMount() {
    console.log('mounting..')
    const { title } = this.props.route.params
    let scorecard = testUser1.find((scorecard) => {
      if (scorecard.title === title) {
        return scorecard
      }
    })

    this.setState({
      curScoreCard: scorecard,
      title: scorecard.title,
      grid: scorecard.grid.slice(),
      roundCount: scorecard.roundCount,
      roundNames: scorecard.roundNames,
      playerCount: 0,
      playerNames: [],
      leaderBoard: []
    })
  }

  addPlayer(){
    let newPlayerCount = this.state.playerCount + 1
    let newGrid = this.state.grid
    let newPlayerNames = this.state.playerNames
    let newRow = []
    for (let i = 0; i < this.state.roundCount; i++) {
      newRow.push(0)
    }
    newGrid[newPlayerCount] = newRow
    newPlayerNames.push('')

    this.setState({
      playerCount: newPlayerCount,
      grid: newGrid,
      playerNames: newPlayerNames
    })
  }

  removePlayer() {
    // console.log('removePlayer')
    if (this.state.playerCount > 1) {
      let newPlayerCount = this.state.playerCount - 1
      let newGrid = this.state.grid
      let newPlayerNames = this.state.playerNames
      newGrid.pop()
      newPlayerNames.pop()
      this.setState({
        playerCount: newPlayerCount,
        grid: newGrid,
        playerNames: newPlayerNames
      })
    }
  }

  saveInputValue(input, row, col) {
    let updatedGrid = this.state.grid
    updatedGrid[row][col] = input
    let leaderBoard = this.state.leaderBoard
    leaderBoard.find((player) => {
      if (player.row == row) {
        player.score = updatedGrid[row].reduce((a,b) => parseInt(a)+parseInt(b), 0)
      }
    })
    leaderBoard.sort((player1, player2) => (player2.score - player1.score))

    this.setState({
      grid: updatedGrid,
      leaderBoard: leaderBoard
    })
  }

  savePlayerName(input, row, col) {
    let newPlayers = this.state.playerNames
    newPlayers[row] = input
    let leaderBoard = this.state.leaderBoard
    let playerUpdated = false
    leaderBoard.map((player) => {
      if (player.row == row) {
        player.name = input
        playerUpdated = true
      }
    })
    if (!playerUpdated) {
      let newPlayer = {
        name: input,
        score: 0,
        row: row
      }
      leaderBoard.push(newPlayer)
    }

    this.setState({
      playerNames: newPlayers,
      leaderBoard: leaderBoard
    })
  }

  finishGame() {
    const winner = this.state.leaderBoard[0]
    if (winner) {
      Alert.alert('Winner!!!', `${winner.name} wins with ${winner.score} points`)
    }
    this.props.navigation.navigate('Home')
  }

  renderRows(row, playerRow, col) {
    return ( 
      <View key={`${row}`} style={{flexDirection: 'row'}}>
        <View key={`${row} + ${col}`}>
          {
            this.state.grid.map(() => {
              playerRow += 1
              if (playerRow == 0) {
                return this.renderHeaderCell('Players')
              } else {
                return this.renderPlayerNameCell(playerRow, col)
              }
            })
          }
        </View>
        <ScrollView horizontal={true}>
          <View key={`${row} + ${col}`} style={styles.grid}>
            {
              this.state.grid.map(() => {
                row += 1
                if (row == 0) {
                  return this.renderHeaderRow()
                } else {
                  col = -1
                  return this.renderPointRow(row , col)
                }
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  renderPlayerNameCell(row, col) {
    return (
      <TextInput  
        key={`${row} + ${col}`}
        style={styles.pointCell}
        placeholder={`Player ${row}`}
        placeholderTextColor="gray"
        returnKeyType="done"
        onSubmitEditing={(e) => {this.savePlayerName(e.nativeEvent.text, row, col)}}
        onEndEditing={(e) => {this.savePlayerName(e.nativeEvent.text, row, col)}}
      />
    )
  }

  renderHeaderRow() {
    let colCount = -1
    return (
      <View key={'headerrow'} style={styles.headerRow}>
        {
          this.state.roundNames.map((header) => {
            colCount += 1
            return this.renderHeaderCell(header, colCount)
          })
        }
      </View>
    )
  }

  renderHeaderCell(headerText, colCount) {
    return (
      <Text key={`${headerText}${colCount}`} style={styles.headerCell}>{headerText}</Text>
    )
  }

  renderPointRow(row, col) {
    return (
      <View key={`${row} + ${col}`} style={styles.pointRow}>
        {
          this.state.roundNames.map(() => {
            col += 1
            return this.renderPointCell(row, col)
          })
        }
      </View>
    )
  }

  renderPointCell(row, col) {
    return (
      <TextInput
        key={`${row} + ${col}`}
        style={styles.pointCell}
        placeholder="" 
        placeholderTextColor="white"
        keyboardType={'numbers-and-punctuation'}
        onSubmitEditing={(e) => {this.saveInputValue(e.nativeEvent.text, row, col)}}
        onEndEditing={(e) => {this.saveInputValue(e.nativeEvent.text, row, col)}}
      />
    )
  }

  render() {
    if (!this.state.grid) {
      return (<Text>Loading...</Text>)
    }

    const { curScoreCard } = this.state
    const buildTable = ['']
    let row = -1
    let col = 0
    let playerRow = -1

    return (
      <View style={{display: 'flex', height: '100%'}}>
        <View style={styles.scoreCardBox}>
          <ScrollView>
            {
              buildTable.map(() => {
                return this.renderRows(row, playerRow, col);
              })
            }
          </ScrollView>
        </View>
        <View style={{height: '50%', flexDirection: 'column'}}>
          <View style={{height: '20%', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
            <View style={generalStyling.buttonArea}>
              <TouchableOpacity style={styles.addPlayerBtn} onPress={this.addPlayer}>
                <Text style={{color:'white'}}>Add Player</Text>
              </TouchableOpacity>
            </View>
            <View style={generalStyling.buttonArea}>
              <TouchableOpacity style={styles.removePlayerBtn} onPress={this.removePlayer}>
                <Text style={{color:'white'}}>Remove Player</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.leaderBoardBox}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>LeaderBoard</Text>
            <ScrollView>
              {
                this.state.leaderBoard.map((player) => {
                  return (<Text key={player.name} >{player.name}: {player.score}</Text>)
                })
              }
            </ScrollView>
          </View>

          <View style={{...generalStyling.buttonArea, padding: 10}}>
            <TouchableOpacity style={styles.finishedBtn} onPress={this.finishGame}>
              <Text style={{fontSize:20, color:'white'}}>Finish</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    )
  }
}
  
const styles = StyleSheet.create({
  headerRow: { height: 40, backgroundColor: '#3C81B9', flexDirection: "row", justifyContent: "center"},
  headerCell: {height: 40, width: 80, backgroundColor: '#3C81B9', color: 'white', textAlign: "center", fontSize: 20},
  pointRow: { height: 50, backgroundColor: '#f5f5f5', flexDirection: "row", justifyContent: "center"},
  pointCell: {height: 50, width: 80, backgroundColor: '#f5f5f5', color: 'black', textAlign: "center", textDecorationStyle: "solid", fontSize: 20, borderWidth: 1},
  pointCellPlayer: {width: 80, backgroundColor: '#646464', color: 'black', textAlign: "center", textDecorationStyle: "solid", fontSize: 20, borderWidth: 1},
  grid: { flexDirection: 'column' },
  scoreCardBox: { height: '50%', overflow: 'hidden', shadowColor: 'black', shadowRadius: 10, shadowOpacity: 1, backgroundColor: 'transparent'},
  leaderBoardBox: {height: '60%', width: '75%', alignSelf: 'center', backgroundColor: 'white', alignItems: 'center',  borderRadius: 5, shadowRadius: 15, shadowColor: 'silver', shadowOpacity: 1},
  addPlayerBtn: {
    ...generalStyling.buttonContent,
    marginHorizontal: 20
  },
  removePlayerBtn: {
    ...generalStyling.buttonContent
  },
  finishedBtn: {
    ...generalStyling.buttonContent
  }
}) 
