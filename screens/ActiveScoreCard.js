import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Value } from 'react-native-reanimated';
import { testUser1 } from '../db'

export default class ActiveScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curScorecard: null,
      playerCount: 1
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.playerCount !== prevState.playerCount) {

    }
  }

  saveInput(input, row, col, players, cols, scorecard) {
    // console.log(row)
    // console.log(col)
    // console.log(scorecard.playerNames)
    // scorecard.updatePlayerName(row, input)
    // scorecard.saveGridValue(row,col,input)
      // this.state.curScorecard.gridValues[row][col] = parseInt(input)
      // this.calculateTotals(players, cols)
  }

  savePlayerName(input, row, col, players, cols, scorecard) {
    // console.log(row)
    // console.log(scorecard.playerNames)
    scorecard.playerNames[row] = input
    // console.log(scorecard.playerNames)
    this.forceUpdate()
  }

  // calculateTotals(players, cols) {
  //   let row = 0
  //   players.forEach(() => {
  //     if (row != 0) {
  //       let total = 0
  //       for (let col = 1; col < cols.length; col++) {
  //         total += this.state.curScorecard.gridValues[row][col]
  //       }
  //       // Send total somewhere to be displayed
  //     }
  //     row += 1
  //   })
  // }

  renderRows(row, playerRow, col, players, colHeaders, scorecard) {
    return ( 
      <View style={{flexDirection: 'row'}}>
        <View>
          {
            players.map(() => {
              playerRow += 1
              if (playerRow == 0) {
                return this.renderHeaderCell('Players')
              } else {
                return this.renderPlayerNameCell(playerRow, col, players, 1, scorecard)
              }
            })
          }
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.grid}>
            {
              players.map(() => {
                row += 1
                if (row == 0) {
                  return this.renderHeaderRow(row, col, colHeaders)
                } else {
                  col = -1
                  return this.renderPointRow(row , col, players, colHeaders, scorecard)
                }
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  renderPlayerNameCell(row, col, players, cols, scorecard) {
    return (
      <TextInput  
        key={Math.random()}
        style={styles.pointCell}
        placeholder=''
        placeholderTextColor="white"
        defaultValue={scorecard.playerNames[row]}
        returnKeyType="done"
        onSubmitEditing={(e) => {this.savePlayerName(e.nativeEvent.text, row, col, players, cols, scorecard)}}
      />
    )
  }

  renderHeaderRow(row, col, colHeaders) {
    return (
      <View key={Math.random()} style={styles.headerRow}>
        {
          colHeaders.map((header) => {
            return this.renderHeaderCell(header)
          })
        }
      </View>
    )
  }

  renderHeaderCell(headerText) {
    return (
      <Text key={Math.random()} style={styles.headerCell}>{headerText}</Text>
    )
  }

  renderPointRow(row, col, players, cols, scorecard) {
    return (
      <View key={Math.random()} style={styles.pointRow}>
        {
          cols.map(() => {
            col += 1
            return this.renderPointCell(row, col, players, cols, scorecard)
          })
        }
      </View>
    )
  }

  renderPointCell(row, col, players, cols, scorecard) {
    return (
      <TextInput
        key={Math.random()}
        style={styles.pointCell}
        placeholder="" 
        placeholderTextColor="white"
        keyboardType={'numbers-and-punctuation'}
        onSubmitEditing={(e) => {this.saveInput(e.nativeEvent.text, row, col, players, cols, scorecard)}}
      />
    )
  }

  render() {
    const { title } = this.props.route.params
    const { navigation } = this.props.navigation

    let scorecard = testUser1.find((scorecard) => {
      if (scorecard.title === title) {
        return scorecard
      }
    })
    const buidTable = ['']
    let headers = scorecard.roundNames
    let row = -1
    let col = 0
    let players = []
    let playerRow = -1

    for (let i = 0; i < scorecard.playerCount; i++) {
      players.push('')
    }
    players.unshift('')

    return (
      <View style={{display: 'flex', height: '100%'}}>
        <View style={styles.scoreCardBox}>
          <ScrollView>
            {
              buidTable.map(() => {
                return this.renderRows(row, playerRow, col, players, headers, scorecard);
              })
            }
          </ScrollView>
        </View>
        <View style={{height: '50%', flexDirection: 'column'}}>
          <View style={{height: '20%', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
            <View style={styles.finishedBtnArray}>
              <TouchableOpacity style={styles.finishedBtn} onPress={() => { 
                let newPlayerCount = scorecard.addPlayer()
                this.setState({playerCount: newPlayerCount})
              }}>
                <Text>Add Player</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.finishedBtnArray}>
              <TouchableOpacity style={styles.finishedBtn} onPress={() => {
                let newPlayerCount = scorecard.removePlayer()
                this.setState({playerCount: newPlayerCount})
              }}>
                <Text>Remove Player</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.leaderBoardBox}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>LeaderBoard</Text>
            <ScrollView>
              {
                scorecard.playerNames.map((player) => {
                  return (<Text>{player}</Text>)
                })
              }
            </ScrollView>
          </View>

          <View style={styles.finishedBtnArea}>
            <TouchableOpacity style={styles.finishedBtn} onPress={() => {
              scorecard.playerNames = []
              scorecard.playerCount = 1
              this.props.navigation.navigate('Home')
            }}>
              <Text>Finished</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    )
  }
}
  
const styles = StyleSheet.create({
  headerRow: { height: 40, backgroundColor: '#E7E6E1', flexDirection: "row", justifyContent: "center"},
  headerCell: {height: 40, width: 80, backgroundColor: '#1f51be', color: 'white', textAlign: "center", fontSize: 20},
  pointRow: { height: 50, backgroundColor: '#8ba9ec', flexDirection: "row", justifyContent: "center"},
  pointCell: {height: 50, width: 80, backgroundColor: '#8ba9ec', color: 'white', textAlign: "center", textDecorationStyle: "solid", fontSize: 20, borderWidth: 1},
  pointCellPlayer: {width: 80, backgroundColor: '#8ba9ec', color: 'white', textAlign: "center", textDecorationStyle: "solid", fontSize: 20, borderWidth: 1},
  grid: { flexDirection: 'column' },
  scoreCardBox: { height: '50%', borderColor: 'white', borderWidth: 1, overflow: 'hidden', shadowColor: 'black', shadowRadius: 10, shadowOpacity: 1, backgroundColor: 'transparent'},
  leaderBoardBox: {height: '60%', width: '75%', alignSelf: 'center', backgroundColor: 'white', alignItems: 'center', borderWidth: 2, borderRadius: 5, shadowRadius: 15, shadowColor: 'silver', shadowOpacity: 1},
  addPlayerBtnArea: {flexDirection: 'row', justifyContent: 'center', padding: 15, marginHorizontal: 20},
  removePlayerBtnArea: {flexDirection: 'row', justifyContent: 'center', padding: 15},
  finishedBtnArea: {flexDirection: 'row', justifyContent: 'center', padding: 15},
  finishedBtn: {backgroundColor: 'lightblue', borderWidth: 2, borderRadius: 10, fontSize: 50, fontWeight: 'bold', padding: 7, justifyContent: 'center'}
}) 
