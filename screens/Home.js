import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';

const window = Dimensions.get('window');
const onSettingPress = () => {};


export default function Home({ route, navigation }) {
  const { username } = route.params
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['steelblue', 'lightgray']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }} 
      >
        <SafeAreaView>
          <View style={styles.homePageHeaderSection}>
            <Text style={styles.headerUserName}>{username}</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={onSettingPress}>
              <Ionicons name='ios-cog' color={'black'} size={40}/>
            </TouchableOpacity>
          </View>
          {/* Add the list here, replace it with the TEXT field */}
          <Text style={styles.generalText}>Hello and Welcome! Add the score card list here</Text>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  generalText: {
    flex: 2,
    color: "white",
    fontSize: 50,
    textAlign: "center"
  },
  homePageHeaderSection: {
    width: window.width,
    height: 70,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10
  },
  headerUserName: {
    fontSize: 30,
    color: "black",
    marginLeft: 30
  },
  button: {
    padding: 10,
    marginHorizontal: 160
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  }
});