import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

const ScoreCardItem = ({ title, navigation  }) => {
    const onPress = () => {
        navigation.navigate('ActiveScoreCard', {
            title: title
        })
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
