import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { testUser1 } from '../db/userScorecards';
import { useIsFocused } from '@react-navigation/native'

export default class Create extends React.Component {
  state = {
      name: "",
      desc: "",
      players: 1,
      columns: 0,
      columnHeaders: {},
      disable: true
    }
  

  render(){
    const { navigate } = this.props.navigation

    const isFocused = useIsFocused()

    useEffect(() => {
        //Update the state you want to be updated
      this.setState({name: "",
                      desc: "",
                      players: 1,
                      columns: 0,
                      columnHeaders: {},
                      disable: true
      })
    } , [isFocused])

    const convertText = (text) => {
      var mynum = parseInt(text);
      if (this.state.columnHeaders.length != this.state.columns) {
        this.setState({columnHeaders: {}});
      }
      this.setState({columns: mynum});
    }

    const submit = () => {
      //build header array
      let headarray = ['Players']
      for (var key in this.state.columnHeaders){
        headarray.push(this.state.columnHeaders[key])
      }

      //build grid
      let newgrid = [headarray]
      let i = 0;
      while( i < this.state.players){
        let playerrow = ['']
        let j = 0;
        while (j < headarray.length-1){
          playerrow.push(0);
          j++;
        }
        newgrid.push(playerrow);
        i++;
      }

      testUser1.push({title: this.state.name,
                      description: this.state.desc,
                      players: this.state.players,
                      headers: headarray,
                      grid: newgrid
                    });
      console.log(testUser1);
      navigate('Home', {
        screen: 'Home',
      })
    }

    const textCheck = () => {
      if (text == ""){
        this.setState({disable: true})
      }else{
        this.setState({disable: false})
      }
    }

    

    const updatecolstate = (text, j) => {
      var oldCol = this.state.columnHeaders
      oldCol[j] = text
      this.setState({columnHeaders: oldCol});
      if (Object.keys(this.state.columnHeaders).length == this.state.columns){
        this.setState({disable: false})
      }
      else{
        this.setState({disable: true})
      }

      //if you delete text from cell disable button
      if (text == ""){
        this.setState({disable: true})
      }
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
      //console.log(this.state);
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
            placeholder="Enter the rules of the game..."
            onChangeText={text => this.setState({desc:text})}></TextInput>
        </View>
        <View style={styles.pad}>
          <Text style={styles.title} ># of Players</Text>
          <TextInput 
            style={styles.numbercontainer}
            keyboardType="numeric"
            placeholder="1"
            onChangeText={text => this.setState({players: parseInt(text)})}></TextInput>
        </View>
        <View style={styles.pad}>
          <Text style={styles.title} ># of Columns (the number of rounds)</Text>
          <TextInput 
            style={styles.numbercontainer}
            keyboardType="numeric"
            placeholder="1"
            onChangeText={text => convertText(text)}></TextInput>
        </View>
        <Text>Enter column names</Text>
        <ScrollView horizontal={true}>
          <View style={{flexDirection:'row'}}>
            {getCols()}
        </View></ScrollView>

        <TouchableOpacity disabled={this.state.disable} onPress={submit}>
          <Text style={[ this.state.disable ? styles.loginBtnD : styles.loginBtn]}>Submit</Text>
        </TouchableOpacity>       
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 30
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
    width:50,
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
    borderRightWidth: 1,
    borderTopWidth: 2,
    borderBottomWidth: 2,
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
    marginTop:40,
    marginBottom:10
  },
  loginBtnD:{
    width:"80%",
    backgroundColor:"#808080",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});