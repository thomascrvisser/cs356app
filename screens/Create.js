import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import InputSpinner from 'react-native-input-spinner';
import { testUser1 } from '../db';
import { scoreCardService } from '../models/scorecard';
import { generalStyling } from '../helpers/styles';

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
          placeholderTextColor='gray'
          onChangeText={text => updatecolstate(text, j)}
         ></TextInput>);
        i++;
      }
      return(wtf);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputArea}>
              <Text style={styles.formTitle}>Name of Game</Text>
              <TextInput 
                style={styles.formInputBox} 
                placeholder="Enter the game name..."
                placeholderTextColor='gray'
                onChangeText={text => this.setState({name:text})}></TextInput>
            </View>
            <View style={styles.formArea}>
              <Text style={styles.formTitle}>Description</Text>
              <TextInput 
                style={styles.formInputBox} 
                placeholder="Enter rules or general info about the game..."
                placeholderTextColor='gray'
                onChangeText={text => this.setState({desc:text})}></TextInput>
            </View>
            <View style={styles.formArea}>
              <Text style={generalStyling.formTitle} ># of Rounds</Text>
              <InputSpinner
                max={20}
                min={1}
                step={1}
                color={"#E4B607"}
                value={this.state.columns}
                textColor={'white'}
                fontSize={30}
                onChange={(num) => {
                  this.setState({columns:num});
                }}
              />
            </View>
            <View style={{...styles.formArea, height: 250}}>
              <Text style={generalStyling.formTitle}>Customize Round Names</Text>
              <Text style={{...generalStyling.formTitle, fontSize: 12}}>(Optional- Defaults to Numbers)</Text>
              <ScrollView horizontal={true}>
                <View style={{flexDirection:'row', flexWrap: 'wrap', alignItems:"flex-start"}}>
                  {getCols()}
                </View>
              </ScrollView>
            </View>
            <View style={styles.submitBtnArea}>
              <TouchableOpacity disabled={this.state.disable} onPress={submit} style={styles.submitBtn}>
                <Text style={{fontSize: 20}}>Submit</Text>
              </TouchableOpacity>
            </View>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...generalStyling.bgScreen,
    alignItems: "center",
    width: "100%",
    height: '100%',
    alignSelf:'baseline',
    paddingTop: 10,
    paddingBottom: 10
  },
  formArea: {
    ...generalStyling.formArea
  },
  formTitle: {
    ...generalStyling.formTitle
  },
  formInputBox: {
    ...generalStyling.formInputBox
  },
  colContainer: {
    ...generalStyling.formInputBox,
    marginLeft: 5,
    marginRight: 5,
    width:100,
    height: 40,
    textAlign: 'center'
  },
  submitBtnArea:{
    ...generalStyling.buttonArea
  },
  submitBtn: {
    ...generalStyling.buttonContent,
    width: 150,
    alignItems: 'center'
  }
});