import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, TextInput, Button } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid'
// import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs'
// import { DialogInput } from 'react-native-dialog-input'
import Dialog from "react-native-dialog"
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class ActiveScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridValues: [
        ['Players', 'blue', 'red', 'green', 'yellow', 'Total'],
        ['Player1', 0, 0, 0, 0, 0],
        ["Player2", 0, 0, 0, 0, 0],
        ['Player3', 0, 0, 0, 0, 0]
      ],
      leaderBoard: [],
      showDialog: false,
      // newName: ''
    }
  }

  render() {
    const { players, headers, grid } = this.props.route.params
    const { navigation } = this.props.navigation
    const buidTable = ['']
    this.state.gridValues = grid
    let headers1 = headers
    let row = -1
    let col = 0
    let players1 = []

    for (let i = 0; i <= players.length; i++) {
      players1.push('')
    }

    const returnHome = () => {
      this.props.navigation.navigate('Home')
    }

    const saveInput = (input, row, col, players, cols) => {
      // Still need to figure out player strings
      // if (col == 0) {
        // this.state.gridValues[row][0] = input
      // }
      this.state.gridValues[row][col] = parseInt(input)
      calculateTotals(players, cols)
    }

    const calculateTotals = (players, cols) => {
      let row = 0
      players.forEach(() => {
        if (row != 0) {
          let total = 0
          for (let col = 1; col < cols.length; col++) {
            total += this.state.gridValues[row][col]
          }
          console.log(this.state.gridValues[row][0])
          let name = this.state.gridValues[row][0]
          this.state.leaderBoard.push({name: name, score: total})
          // Send total somewhere to be displayed
        }
        row += 1
      })
      console.log(this.state.leaderBoard)
    }

    const renderRows = (row, col, players, colHeaders) => {
      return ( 
          <View>
            <ScrollView horizontal={true}>
              <View style={styles.grid}>
                {
                  players.map(() => {
                    row += 1
                    if (row == 0) {
                      return renderHeaderRow(row, col, colHeaders)
                    } else {
                      col = -1
                      return renderPointRow(row , col, players, colHeaders)
                    }
                  })
                }
              </View>
            </ScrollView>
          </View>
      );
    }

    const renderHeaderRow = (row, col, colHeaders) => {
      return (
          <View key={Math.random()} style={styles.headerRow}>
              {
                colHeaders.map((header) => {
                  col += 1
                  return renderHeaderCell(header)
                })
              }
          </View>
      );
    }
  
    const renderHeaderCell = (headerText) => {
      return (
        <Text key={Math.random()} style={styles.headerCell}>{headerText}</Text>
      )
    }

    const renderPointRow = (row, col, players, cols) => {
      const showDialog = () => {
        this.setState({showDialog: true})
      }
     
      const handleSave = () => {
        this.state.leaderBoard[row] = this.state.newName
        this.setState({showDialog: false})
      }
  
      return (
        <View key={Math.random()} style={styles.pointRow}>
          {
            cols.map(() => {
              col += 1
              if (col == 0) {
                return (
                  <View key={Math.random()} style={styles.container}>
                    <Button title='player' onPress={showDialog} />
                    <Dialog.Container visible={this.state.showDialog}>
                      <Dialog.Title>Add Player</Dialog.Title>
                      <Dialog.Input placeholder='player 1' onEndEditing={(text) => {}}></Dialog.Input>
                      <Dialog.Button label="Save" onPress={handleSave} />
                    </Dialog.Container>
                  </View>
                )
              }
              return renderPointCell(row, col, players, cols)
            })
          }
        </View>
      )
    }
  
    const renderPointCell = (row, col, players, cols) => {
      return (
        <TextInput  
          key={Math.random()}
          style={styles.pointCell}
          placeholder="" 
          placeholderTextColor="white"
          onChangeText={text => {saveInput(text.toString(), row, col, players, cols)}}
        />
      )
    }


    return (
      <View key={Math.random()}>
        <View style={{ height: "50%"}}>
          <ScrollView>
            {
              buidTable.map(() => {
                return renderRows(row, col, players1, headers1);
              })
            }
        </ScrollView>
        </View>
        <View style={{height: '50%', flexDirection: "column"}}>
          <View style={styles.leaderBoard}>
            <Grid>
              <Row style={styles.leaderBoardHeader}><Text>LeaderBoard</Text></Row>
              {
                players1.map(() => {
                  return (<Row><Text>{'player'}: {'score'}</Text></Row>)
                })
              }
            </Grid>
          </View>
          <View style={styles.finishedBtnArray}>
              <TouchableOpacity style={styles.finishedBtn} onPress={returnHome}>
                <Text>Finished</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRow: { height: 40, backgroundColor: '#E7E6E1', flexDirection: "row", justifyContent: "center"},
  headerCell: {height: 70, width: 80, backgroundColor: '#1f51be', color: 'white', textAlign: "center"},
  pointRow: { height: 50, backgroundColor: '#8ba9ec', flexDirection: "row", justifyContent: "center"},
  pointCell: {width: 80, backgroundColor: '#8ba9ec', color: 'white', textAlign: "center", textDecorationStyle: "solid", fontSize: 30, borderWidth: 1},
  grid: { flexDirection: 'column' },
  finishedBtnArray: {flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  finishedBtn: {backgroundColor: 'lightblue', borderWidth: 2, borderRadius: 10, fontSize: 50, fontWeight: 'bold', padding: 7},
  leaderBoard: {height: 200, alignSelf: 'center', backgroundColor: 'lightgreen'},
  leaderBoardHeader: { height: 30, width: '100%',justifyContent: 'center'}
});