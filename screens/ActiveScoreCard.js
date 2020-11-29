import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { testUser1 } from '../db'
import { generalStyling } from '../helpers/styles'
import { Icon } from 'react-native-elements';

export default class ActiveScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curScoreCard: null,
      title: '',
      grid: null,
      roundCount: 1,
      roundNames: ['1'],
      playerCount: 1,
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
      grid: scorecard.grid,
      roundCount: scorecard.roundCount,
      roundNames: scorecard.roundNames,
      playerCount: scorecard.playerCount,
      playerNames: scorecard.playerNames,
      leaderBoard: []
    })
  }

  addPlayer(){
    // console.log('addPlayer')
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
    // console.log('save Input value')
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
    // console.log('save player name')
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
    // console.log(this.state.curScoreCard.defaultGrid)
    // this.setState({
    //   grid: this.state.curScoreCard.defaultGrid,
    //   playerCount: this.state.curScoreCard.defaultGrid.length-1,
    //   playerNames: ['Players', '']
    // })
    this.props.navigation.navigate('Home')
  }

  renderRows(row, playerRow, col) {
    return ( 
      <View key={Math.random()} style={{flexDirection: 'row'}}>
        <View key={Math.random()}>
          {
            this.state.playerNames.map(() => {
              playerRow += 1
              if (playerRow == 0) {
                return this.renderHeaderCell('Players')
              } else {
                return this.renderPlayerNameCell(playerRow, col)
              }
            })
          }
        </View>
        <ScrollView key={Math.random()} horizontal={true}>
          <View key={Math.random()} style={styles.grid}>
            {
              this.state.playerNames.map(() => {
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
      <View styles={{}}>
      <TextInput  
        key={Math.random()}
        style={{...styles.pointCell, fontWeight: 'bold'}}
        placeholder=''
        placeholderTextColor="white"
        defaultValue={this.state.playerNames[row]}
        returnKeyType="done"
        onSubmitEditing={(e) => {this.savePlayerName(e.nativeEvent.text, row, col)}}
      />
      </View>
    )
  }

  renderHeaderRow() {
    return (
      <View key={Math.random()} style={styles.headerRow}>
        {
          this.state.roundNames.map((header) => {
            return this.renderHeaderCell(header)
          })
        }
      </View>
    )
  }

  renderHeaderCell(headerText) {
    // if (headerText == 'Players') {
    //   return (
    //     <View style={{}}>
    //     <Text key={Math.random()} style={{...styles.headerCell, fontSize: 15, paddingTop: -10, borderColor: 'white', borderWidth: 1}}>{`${headerText}\n`}<Icon 
    //       style={{marginLeft: 35, paddingTop: 5}}
    //       name={'arrow-down'}
    //       size={15}
    //       type='font-awesome' 
    //       color='white'/></Text>
    //     </View>
    //   )
    // } else {
      return (
        <View>
          {/* <Text key={Math.random()} style={styles.headerCell}>Rounds</Text> */}
          <Text key={Math.random()} style={{...styles.headerCell, borderColor: 'white', borderWidth: 1}}>{headerText}</Text>
        </View>
      )
    // }
    
  }

  renderPointRow(row, col) {
    return (
      <View key={Math.random()} style={styles.pointRow}>
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
        key={Math.random()}
        style={styles.pointCell}
        placeholder="" 
        placeholderTextColor="white"
        defaultValue={(this.state.grid[row][col]).toString()}
        keyboardType={'numbers-and-punctuation'}
        onSubmitEditing={(e) => {this.saveInputValue(e.nativeEvent.text, row, col)}}
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
      <View style={styles.container}>
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
                <Text>Add Player</Text>
              </TouchableOpacity>
            </View>
            <View style={generalStyling.buttonArea}>
              <TouchableOpacity style={styles.removePlayerBtn} onPress={this.removePlayer}>
                <Text>Remove Player</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.leaderBoardBox}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>LeaderBoard</Text>
            <ScrollView>
              {
                this.state.leaderBoard.map((player) => {
                  return (<Text>{player.name}: {player.score}</Text>)
                })
              }
            </ScrollView>
          </View>

          <View style={{...generalStyling.buttonArea, padding: 10}}>
            <TouchableOpacity style={styles.finishedBtn} onPress={this.finishGame}>
              <Text style={{fontSize:20}}>Finished</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    )
  }
}
  
const styles = StyleSheet.create({
  container: { display: 'flex', height: '100%', ...generalStyling.bgScreen },
  headerRow: { height: 40, flexDirection: "row", justifyContent: "center"},
  headerCell: {height: 40, width: 80, backgroundColor: '#122732', color: 'white', textAlign: "center", fontSize: 20, paddingTop: 5},
  pointRow: { height: 50, backgroundColor: '#8ba9ec', flexDirection: "row", justifyContent: "center"},
  pointCell: {height: 50, width: 80, backgroundColor: 'white', color: 'black', textAlign: "center", textDecorationStyle: "solid", fontSize: 20, borderWidth: 1},
  pointCellPlayer: {width: 80, backgroundColor: '#8ba9ec', color: 'white', textAlign: "center", textDecorationStyle: "solid", fontSize: 20, borderWidth: 1},
  playerNameCell: {height: 50, width: 80, backgroundColor: 'white', color: 'black', textAlign: "center", textDecorationStyle: "solid", fontSize: 20},
  grid: { flexDirection: 'column' },
  scoreCardBox: { height: '50%', borderColor: 'white', borderWidth: 1, overflow: 'hidden', shadowColor: 'black', shadowRadius: 10, shadowOpacity: 1, backgroundColor: 'transparent' },
  leaderBoardBox: {height: '60%', width: '75%', alignSelf: 'center', backgroundColor: 'white', alignItems: 'center', borderWidth: 2, borderRadius: 5, shadowRadius: 15, shadowColor: 'silver', shadowOpacity: 1},
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
