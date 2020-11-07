import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function settings({ navigation }) {
  return (
    <View>
      <View style={styles.inputView} >
      <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({username:text})}/>
      </View>
      <View style={styles.inputView} >
      <TextInput  
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
      </View>
      <View style={styles.inputView} >
      <TextInput  
            style={styles.inputText}
            placeholder="ConfirmPassword..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({confirmPassword:text})}/>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Home', {username: this.state.username})}>
          <Text style={styles.loginText}>Save</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
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
  loginText:{
    color:"white"
  }
});
