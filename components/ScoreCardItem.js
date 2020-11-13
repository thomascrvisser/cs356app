import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Card } from "@paraboly/react-native-card";
import { testUser1 } from '../db'

export default function ScoreCardItem({ title, navigation }) {
    const onPress = () => {
        const scorecard = testUser1.find((scorecard) => { 
            if (scorecard.title === title) {
                return scorecard
            }
        })
        if (scorecard) {
            navigation.navigate('ActiveScoreCard', {
                players: scorecard.players,
                headers: scorecard.headers,
                grid: scorecard.grid
            })
        } else {
            Alert('There is an error with the scorecard.')
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