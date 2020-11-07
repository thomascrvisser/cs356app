import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

const window = Dimensions.get('window');

export default function HomeScreen({ navigation, navigationOptions }) {
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
            <Text style={styles.headerUserName}>{navigation.getParam('username')}</Text>
            <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => {
                  navigation.navigate('Settings')
                }}>
              <Image
                style={styles.buttonImageIconStyle}
                source={require('./assets/settings_icon.png')}
              />
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