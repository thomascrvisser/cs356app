import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { generalStyling } from '../helpers/styles'
import { FireBase }  from '../db'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
    }
  }

  render(){
    const { navigate } = this.props.navigation

    const handleLogin = async () => {
      const { email, password } = this.state
      FireBase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log('logging in...')
          navigate('Home', {
            screen: 'Home'
          })
        })
        .catch((err) => {
          console.log('Login Error.')
          console.log(err)
        })
    }

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>{`ScoreKeeper \n Pro`}</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
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
    ...generalStyling.entryLogo,
    textAlign: 'center'
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
