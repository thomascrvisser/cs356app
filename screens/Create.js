import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';
import { testUser1 } from '../db';
import { scoreCardService } from '../models/scorecard';


export default class Create extends React.Component {
  state = {
      name: "",
      desc: "",
      players: 1,
      columns: 1,
      columnHeaders: {},
      disable: false
    }
  

  render(){
    const initState = {
      name: "",
      desc: "",
      players: 1,
      columns: 1,
      columnHeaders: {},
      disable: false
    }

    const createHeaderArray = () => {
      let headarray = []
      // if user didn't customize column names, create default
      if (Object.keys(this.state.columnHeaders).length == 0){
        for(var i = 0; i < this.state.columns; i++){
          headarray.push(`${i+1}`)
        }
      }
      //otherwise build the header array
      else{ 
        for (var key in this.state.columnHeaders){
          headarray.push(this.state.columnHeaders[key])
        }
      }
      return headarray;
    }

    const createName = () => {
      if(this.state.name == ""){
        var num = Math.floor((Math.random() * 10000 + 1))
        return `Game ${num}`
      }
      else{
        return this.state.name
      }
    }

    const submit = () => {
      let headarray = createHeaderArray();
      let name = createName();
      let newScorecard = new scoreCardService(
        name,
        this.state.desc,
        this.state.players,
        headarray.length,
        headarray
      )

      testUser1.push(newScorecard)
      console.log(this.state.name);
      this.props.navigation.replace('Home');
    }    

    const updatecolstate = (text, j) => {
      var oldCol = this.state.columnHeaders
      oldCol[j] = text
      this.setState({columnHeaders: oldCol});
    }

    const getCols = () => {
      let i = 0;
      let wtf = []

      while (i < this.state.columns){
        let j = (i+1).toString();
        wtf.push(<TextInput 
          key = {j}
          style={styles.colContainer} 
          placeholder={j}
          onChangeText={text => updatecolstate(text, j)}
         ></TextInput>);
        i++;
      }
      return(wtf);
    }

    return (
        <View style={styles.container}>
            <View style={styles.pad}>
              <Text style={styles.title}>Name of Game</Text>
              <TextInput 
                style={styles.inputcontainer} 
                placeholder="Enter the game name..."
                onChangeText={text => this.setState({name:text})}></TextInput>
            </View>
            <View style={styles.pad}>
              <Text style={styles.title}>Description</Text>
              <TextInput 
                style={styles.inputcontainer} 
                placeholder="Enter rules or general info about the game..."
                onChangeText={text => this.setState({desc:text})}></TextInput>
            </View>
            <View style={styles.pad}>
              <Text style={styles.title} ># of Rounds</Text>
              <InputSpinner
                max={20}
                min={1}
                step={1}
                color={"#fb5b5a"}
                value={this.state.columns}
                onChange={(num) => {
                  this.setState({columns:num});
                }}
              />
            </View>
            <Text>Customize Round Names</Text>
            <ScrollView horizontal={true}>
              <View style={{flexDirection:'row', flexWrap: 'wrap', alignItems:"flex-start"}}>
                {getCols()}
              </View>
            </ScrollView>

            <TouchableOpacity disabled={this.state.disable} onPress={submit}>
              <Text style={styles.loginBtn}>Submit</Text>
            </TouchableOpacity>       
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    width: "100%",
    alignSelf:'baseline'
  },
  pad: {
    paddingBottom: 15
  },
  title: {
   paddingBottom: 5
  },
  numbercontainer: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    height: 40,
    textAlign: 'center'
  },
  inputcontainer: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,

    width:300,
    height: 40,
  },
  colContainer: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginLeft: 5,
    marginRight: 5,
    width:100,
    height: 40,
    textAlign: 'center'
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    width:300,
    marginTop:40,
    marginBottom:10
  }
});