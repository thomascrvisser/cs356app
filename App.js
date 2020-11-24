import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigate';
import { initializeScorecardList } from './helpers/setup'
import { appScorecardList } from './db'

export default function App() {
  const initialList = initializeScorecardList()
  initialList.map((game) => appScorecardList.push(game))

  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
