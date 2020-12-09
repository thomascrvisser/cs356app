import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { generalStyling } from '../helpers/styles'

export default class App extends React.Component {
  state = {
    username:"",
    password:""
  }

  render(){
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>ScoreApp</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({username:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        
        <TouchableOpacity style={styles.loginBtn} onPress={()=> navigate('Home', {
          screen: 'Home',
          params: { username: this.state.username },
        })}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigate('Register')}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>

  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...generalStyling.entryScreens
  },
  logo:{
    ...generalStyling.entryLogo
  },
  inputView:{
    ...generalStyling.inputView
  },
  inputText:{
    ...generalStyling.inputText
  },
  loginBtn:{
    ...generalStyling.loginBtn
  },
  loginText:{
    ...generalStyling.loginText
  }
});
