import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { testUser1 } from '../db'

const ScoreCardItem = ({ title, navigation  }) => {
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
        <View style={styles.card} >
            <View style={styles.cardContent}>
                <Text onPress={onPress} style={styles.cardTitleText}>{ title }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
      borderRadius:6,
      elevation: 3,
      backgroundColor: "lightgray",
      shadowOffset: {width: 1, height: 1},
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      width: 300,
      height: 70,
      marginHorizontal: 4,
      marginVertical: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    },
    cardTitleText: {
        fontSize: 30
    }
})

export { ScoreCardItem }
