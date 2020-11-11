import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from "@paraboly/react-native-card";
import { testUser1 } from '../db'

export default function ScoreCardItem({ title, navigation }) {
    const onPress = () => {
        alert(`You tapped ${title}`)
        if (title == testUser1[0].title) {
            const skullKingScorecard = testUser1[0]
            navigation.navigate('ActiveScoreCard', {
                players: skullKingScorecard.players,
                headers: skullKingScorecard.headers,
                grid: skullKingScorecard.grid
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
