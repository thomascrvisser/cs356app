import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { ScoreCardItem } from '../components/ScoreCardItem';
import { testUser1 } from '../db'
import { generalStyling } from '../helpers/styles'
import { FireBase } from '../db'

const window = Dimensions.get('window');

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scorecardList: [],
      user: {},
      userName: ''
    }
  }

  componentDidMount() {
    console.log('mounting')
    if (this.state.scorecardList.length != testUser1.length) {
      console.log('change...')
      this.setState({
        scorecardList: testUser1
      })
    }
    const user = FireBase.auth().currentUser
    console.log(user.displayName)
    this.setState({ userName: user.displayName })
  }

  componentWillUnmount() {
    console.log('unmounting home screen')
  }

  render() {
    const renderHeader = () => {
      return (
        <View style={styles.scorecardListHeaderView}>
          <Text style={styles.scorecardListHeaderText}>{`Game List`}</Text>
        </View>
      );
    };

    const deleteItem = (index) => {
      testUser1.splice(index, 1)
      this.setState({scorecardList: testUser1})
    }

    return (
      <View style={styles.container}>
            <SafeAreaView>
              {/* Add the list here, replace it with the TEXT field */}
                <FlatList
                  data={testUser1}
                  renderItem={({ item, index }) => (
                    <ScoreCardItem title={item.title} navigation={this.props.navigation} handleDelete={() => deleteItem(index)}/>
                  )}
                  keyExtractor={item => item.title}
                  ListHeaderComponent={renderHeader}
                />
            </SafeAreaView>
        </View>
    );
  }
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
  scorecardListHeaderText: {
    ...generalStyling.headers,
    textAlign: 'center',
    color:'white'
  },
  scorecardListHeaderView: {
    backgroundColor: '#3C81B9',
    borderRadius: 20,
    padding: 5,
    marginTop: 10
  }
});
