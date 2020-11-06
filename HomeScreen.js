import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';

const DATA = {
  title: 'Test User'
};
const window = Dimensions.get('window');
const onSettingPress = () => {};


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.homePageHeaderSection}>
          <Text style={styles.headerUserName}>{DATA.title}</Text>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={onSettingPress}>
            <Image
              style={styles.buttonImageIconStyle}
              source={require('./assets/settings_icon.png')}
            />
          </TouchableOpacity>
        </View>
        {/* Add the list here, replace it with the TEXT field */}
        <Text style={styles.generalText}>Hello and Welcome! Add the score card list here</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generalText: {
    flex: 2,
    color: "blue",
    fontSize: 50,
    textAlign: "center"
  },
  homePageHeaderSection: {
    width: window.width,
    height: 70,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerUserName: {
    fontSize: 30,
    color: "black",
    marginLeft: 30
  },
  button: {
    backgroundColor: "#DDDDDD",
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