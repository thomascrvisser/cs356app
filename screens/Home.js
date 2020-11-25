import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { ScoreCardItem } from '../components/ScoreCardItem';
import { testUser1 } from '../db'
import { generalStyling } from '../helpers/styles'

const window = Dimensions.get('window');

function Home({ route, navigation }) {

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  const renderHeader = () => {
    return (
      <Text style={styles.scorecardHeader}>ScoreCards</Text>
    );
  };

  return (
    <View style={styles.container}>
          <SafeAreaView>
            {/* Add the list here, replace it with the TEXT field */}
            <FlatList
              data={testUser1}
              renderItem={({ item }) => (
                <ScoreCardItem title={item.title} navigation={navigation}/>
              )}
              keyExtractor={item => item.title}
              ListHeaderComponent={renderHeader}
            />
          </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...generalStyling.bgScreen,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
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
  },
  scorecardHeader: {
    ...generalStyling.headers,
    textAlign: "center",
    justifyContent: 'center',
    height: 40
  }
});

export default Home
