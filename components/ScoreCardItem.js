import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from "@paraboly/react-native-card";
import { skullKingScorecard, ninesScorecard } from '../db'

export default function ScoreCardItem({ title, navigation }) {
    const onPress = () => {
        alert(`You tapped ${title}`)
        if (title == skullKingScorecard.title) {
            navigation.navigate('ActiveScoreCard', {
                players: skullKingScorecard.players,
                headers: skullKingScorecard.headers,
                grid: skullKingScorecard.grid
            })
        }
        if (title == ninesScorecard.title) {
            navigation.navigate('ActiveScoreCard', {
                players: ninesScorecard.players,
                headers: ninesScorecard.headers,
                grid: ninesScorecard.grid
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
