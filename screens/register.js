import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { generalStyling } from '../helpers/styles'
import { FireBase } from '../db'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      email:"",
      password:"",
      confirm_password:""
    }
  }

  render(){
    const { navigate } = this.props.navigation

    const handleSignUp = async () => {
      const {email, password, confirm_password, username} = this.state
      console.log('signing up...')
      if (password != confirm_password) {
        Alert.alert('Invalid Password!', 'Passwords do not match.')
      } else if (password.length < 6) {
        Alert.alert('Invalid Password!', 'Password must have a minimum of 6 characters.')
      } else {
        console.log('should register and authenticate.')
        console.log(email)
        console.log(password)
        console.log(username)

        FireBase.auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async () => {
            const user = await FireBase.auth().currentUser
            await user.updateProfile({
              displayName: username
            })
            console.log('logging in...')
            navigate('Home', {
              screen: 'Home'
            })
          })
          .catch((err) => {
            console.log('Register Error')
            console.log(err)
          })
      }   
    }

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Register</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({username: text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({email: text})}/>
        </View>
        <View style={{...styles.inputView, marginBottom: 5}} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({password: text})}/>
        </View>
        <View style={{marginBottom: 5}}>
          <Text style={{color: 'white'}}>*Password must be minimum 6 characters</Text>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({confirm_password: text})}/>
        </View>
        
        <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> this.props.navigation.goBack(null)}>
          <Text style={styles.loginText}>Login</Text>
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
