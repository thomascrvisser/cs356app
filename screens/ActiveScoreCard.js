import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
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
    // scorecard.saveGridValue(row,col,input)
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

  renderRows(row, col, players, colHeaders, scorecard) {
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
                  return this.renderPointRow(row , col, players, colHeaders, scorecard)
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
    if (col === 0) {
      return (
        <TextInput  
          key={Math.random()}
          style={styles.pointCellPlayer}
          placeholder="" 
          placeholderTextColor="white"
          onChangeText={text => {this.saveInput(text.toString(), row, col, players, cols, scorecard)}}
        />
      )
    } else {
      return (
        <TextInput  
          key={Math.random()}
          style={styles.pointCell}
          placeholder="" 
          placeholderTextColor="white"
          keyboardType={'numbers-and-punctuation'}
          onChangeText={text => {this.saveInput(text, row, col, players, cols)}}
        />
      )
    }
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
                return this.renderRows(row, col, players1, headers1, scorecard);
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
