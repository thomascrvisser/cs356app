import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button, TextInput } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import {SearchCardItem} from '../components/SearchCardItem';
import { appScorecardList } from '../db';
import { generalStyling } from '../helpers/styles'

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: '',
      home: 0
    };
  }

  renderSeparator = () => {
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

  searchItems = text => {
    let newData = appScorecardList.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
    if(text.length >0 ){
      return itemData.indexOf(textData) > -1;
    }
    });
    this.setState({
      data: newData,
      value: text,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="   Type Name..."
        clearicon= {true}
        onChangeText={text => this.searchItems(text)}
        value={this.state.value}
        lightTheme={true}
        round={true}
      />
    );
  };

  // addHome = (name) => {
  //   //if the scorecard name isn't already in the userscorecards, add it, otherwise don't
  //   var good = true;
  //   for (var i = 0; i < testUser1.length; i++) {
  //     if (name == testUser1[i]['title']){
  //       good = false;
  //     }
  //   }
  //   if(good){
  //     testUser1.push({title: name,
  //       description: "from search",
  //       players: 4,
  //       headers: ['Players','1','2','3','4','5','6','7','8','9','10'],
  //       grid: [
  //         ['Players','1','2','3','4','5','6','7','8','9','10'],
  //         ['',0,0,0,0,0,0,0,0,0,0],
  //         ['',0,0,0,0,0,0,0,0,0,0],
  //         ['',0,0,0,0,0,0,0,0,0,0],
  //         ['',0,0,0,0,0,0,0,0,0,0],
  //       ]
  //     })
  //   }
  //   console.log(testUser1);
  // }


  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            style={styles.list}
            data={this.state.data}
            renderItem={({ item }) => (
              <SearchCardItem title={item.title} navigation={this.props.navigation}/>
            )}
            keyExtractor={item => item.title}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            stickyHeaderIndices={[0]}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    ...generalStyling.bgScreen,
    justifyContent: 'center',
 
  },
  list: {
    height: '100%',
  }
})