import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button, TextInput } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import ScoreCardItem, { Card } from '../components/ScoreCardItem';
import SearchCardItem from '../components/SearchCardItem';
import { testUser1 } from '../db/userScorecards';
import { premadeGames } from '../db/premadeGames';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: '',
    };

    this.arrayNew = [
      { name: 'Skull King' },
      { name: 'Rummy' },
      { name: 'Uno' },
      { name: 'Nines' },
      { name: 'Hearts' },
      { name: 'Crazy Eights' },
      { name: 'War' },
      { name: 'Canasta' },
      { name: 'Scum' },
    ];
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
    let newData = premadeGames.filter(item => {
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

  addHome = (name) => {
    var good = true;
    for (var i = 0; i < testUser1.length; i++) {
      if (name == testUser1[i]['title']){
        good = false;
      }
    }
    if(good){
      testUser1.push({title: name,
        description: "from search",
        players: 4,
        headers: ['Players','1','2','3','4','5','6','7','8','9','10'],
        grid: [
          ['Players','1','2','3','4','5','6','7','8','9','10'],
          ['',0,0,0,0,0,0,0,0,0,0],
          ['',0,0,0,0,0,0,0,0,0,0],
          ['',0,0,0,0,0,0,0,0,0,0],
          ['',0,0,0,0,0,0,0,0,0,0],
        ]
      })
    }
    console.log(testUser1);
  }


  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <SearchCardItem title={item.title} navigation={this.props.navigation}/>
          )}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );
  }
}