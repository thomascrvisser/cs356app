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
      data: appScorecardList,
      value: '',
      home: 0
    };
  }

  searchItems = text => {
    let newData = appScorecardList.filter(item => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
    if(text.length >0 ){
      return itemData.indexOf(textData) > -1;
    }else{
      return appScorecardList;
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