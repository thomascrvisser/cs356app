import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          placeholder="Search scorecard..."
          onChangeText={this.updateSearch}
          value={search}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});