import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { generalStyling } from '../helpers/styles'

export default class App extends React.Component {
  state={
    username:"",
    password:"",
    confirm_password:""
  }

  render(){
      const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Register</Text>
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
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password..." 
            placeholderTextColor="#434343"
            onChangeText={text => this.setState({confirm_password:text})}/>
        </View>
        
        <TouchableOpacity style={styles.loginBtn} onPress={()=>navigate('Home')}>
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
