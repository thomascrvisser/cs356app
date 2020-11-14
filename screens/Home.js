import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { ScoreCardItem } from '../components/ScoreCardItem';
import { testUser1 } from '../db'

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
      <LinearGradient
        colors={['steelblue', 'lightgray']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <SafeAreaView>
            {/* Add the list here, replace it with the TEXT field */}
            <FlatList
              data={testUser1}
              renderItem={({ item }) => (
                <ScoreCardItem title={item.title} navigation={navigation}/>
              )}
              keyExtractor={item => item.title}
              ItemSeparatorComponent={renderSeparator}
              ListHeaderComponent={renderHeader}
            />
          </SafeAreaView>
        </LinearGradient>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 30,
    color: "white",
    textAlign: "center",
    justifyContent: 'center',
    height: 40
  }
});

export default Home
