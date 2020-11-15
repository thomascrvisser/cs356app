import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { scoreCardService } from '../db'
import { testUser1 } from '../db'

export default class ActiveScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
      curScorecard: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update??')
    if (this.state.curScorecard.playerCount !== prevState.curScorecard.playerCount) {
      console.log('search for updated scorecard')
      const newScorecard = testUser1.find((scorecard) => {
        if (scorecard.title === this.state.curScorecard.title) {
            return scorecard
        }
      })
      this.state.curScorecard = newScorecard
    }
  }
  // componentDidUpdate(prevProps) {
  //   console.log('update??')
  //   if (this.state.test !== prevProps.test) {
  //     console.log('search for updated scorecard')
  //     // this.setState({ curScorecard: testUser1.find((scorecard) => {
  //     //   if (scorecard.title === title) {
  //     //      return scorecard
  //     //   }
  //     // })
  //     // })
  //   }
  // }

  saveInput(input, row, col, players, cols) {
      // this.state.curScorecard.gridValues[row][col] = parseInt(input)
      // this.calculateTotals(players, cols)
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

  renderRows(row, col, players, colHeaders) {
    return ( 
      <View>
        <ScrollView horizontal={true}>
          <View style={styles.grid}>
            {
              players.map(() => {
                row += 1
                if (row == 0) {
                  return this.renderHeaderRow(row, col, colHeaders)
                } else {
                  col = -1
                  return this.renderPointRow(row , col, players, colHeaders)
                }
              })
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  renderHeaderRow(row, col, colHeaders) {
    return (
      <View key={Math.random()} style={styles.headerRow}>
        {
          colHeaders.map((header) => {
            col += 1
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

  renderPointRow(row, col, players, cols) {
    return (
      <View key={Math.random()} style={styles.pointRow}>
        {
          cols.map(() => {
            col += 1
            return this.renderPointCell(row, col, players, cols)
          })
        }
      </View>
    )
  }

  renderPointCell(row, col, players, cols) {
    if (col === 0) {
      return (
        <TextInput  
          key={Math.random()}
          style={styles.pointCellPlayer}
          placeholder="" 
          placeholderTextColor="white"
          onChangeText={text => {this.saveInput(text.toString(), row, col, players, cols)}}
        />
      )
    } else {
      return (
        <TextInput  
          key={Math.random()}
          style={styles.pointCell}
          placeholder="" 
          placeholderTextColor="white"
          onChangeText={text => {this.saveInput(text.toString(), row, col, players, cols)}}
        />
      )
    }
  }

  render() {
    const { players, headers, grid, scorecard } = this.props.route.params
    const { navigation } = this.props.navigation
    const buidTable = ['']
    this.state.curScorecard = {...scorecard}
    let headers1 = scorecard.roundNames
    let row = -1
    let col = 0
    let players1 = []

    for (let i = 0; i < scorecard.playerCount; i++) {
      players1.push('')
    }
    players1.unshift('')

    return (
      <View>
        <View style={{ height: "70%"}}>
          <ScrollView>
            {
              buidTable.map(() => {
                return this.renderRows(row, col, players1, headers1);
              })
            }
        </ScrollView>
        </View>
        <View style={styles.finishedBtnArray}>
          <TouchableOpacity style={styles.finishedBtn} onPress={() => this.props.navigation.navigate('Home')}>
            <Text>Finished</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.finishedBtnArray}>
          <TouchableOpacity style={styles.finishedBtn} onPress={() => { 
            let newPlayerCount = scoreCardService.addPlayer(this.state.curScorecard)
            this.setState({playerCount: newPlayerCount})
            alert('Player added!')
          }}>
            <Text>Add Player</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.finishedBtnArray}>
          <TouchableOpacity style={styles.finishedBtn} onPress={() => {
            // this.setState({test: true})
            scoreCardService.removePlayer(this.state.curScorecard)
            alert('Player removed!')
          }}>
            <Text>Remove Player</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
  
const styles = StyleSheet.create({
  headerRow: { height: 40, backgroundColor: '#E7E6E1', flexDirection: "row", justifyContent: "center"},
  headerCell: {height: 70, width: 80, backgroundColor: '#1f51be', color: 'white', textAlign: "center"},
  pointRow: { height: 50, backgroundColor: '#8ba9ec', flexDirection: "row", justifyContent: "center"},
  pointCell: {width: 80, backgroundColor: '#8ba9ec', color: 'white', textAlign: "center", textDecorationStyle: "solid", fontSize: 30, borderWidth: 1},
  pointCellPlayer: {width: 80, backgroundColor: '#8ba9ec', color: 'white', textAlign: "center", textDecorationStyle: "solid", fontSize: 20, borderWidth: 1},
  grid: { flexDirection: 'column' },
  finishedBtnArray: {flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  finishedBtn: {backgroundColor: 'lightblue', borderWidth: 2, borderRadius: 10, fontSize: 50, fontWeight: 'bold', padding: 7}
}) 
