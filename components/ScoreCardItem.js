import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from "@paraboly/react-native-card";
import { testUser1 } from '../db'

export default function ScoreCardItem({ title, navigation }) {
    const onPress = () => {
        alert(`You tapped ${title}`)
        navigation.navigate('ActiveScoreCard')
        if (title == testUser1[0].title) {
            navigation.navigate('ActiveScoreCard', {
                players: testUser1[0].players,
                headers: testUser1[0].headers,
                grid: testUser1[0].grid
            })
        }
    }

    return (
        <Card
            style={styles.container}
            title={title}
            iconName="bookmark"
            onPress={onPress}
        />
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "lightgray"
    },
  });