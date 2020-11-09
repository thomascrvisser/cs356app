import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button, TextInput } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import ScoreCardItem, { Card } from '../components/ScoreCardItem';

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
    let newData = this.arrayNew.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
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

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ScoreCardItem title={item.name} navigation={this.props.navigation}/>
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );
  }
}