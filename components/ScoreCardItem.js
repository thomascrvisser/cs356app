import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { testUser1 } from '../db'
import { generalStyling } from '../helpers/styles'

const ScoreCardItem = ({ title, navigation  }) => {
    const onPress = () => {
        navigation.navigate('ActiveScoreCard', {
            title: title
        })
    }

    return (
        <View style={styles.card} >
            <View style={styles.cardContent}>
                <Text style={styles.cardTitleText}>{ title }</Text>
                <Icon onPress={onPress} style={styles.iconContent} 
                      name={'play'}
                      size={30}
                      type='font-awesome' 
                      color='#2B2D2F'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        ...generalStyling.cardStyle
    },
    cardContent: {
        ...generalStyling.cardContent
    },
    iconContent: {
       ...generalStyling.iconContent
    },
    cardTitleText: {
        ...generalStyling.cardTitleText
    }
})

export { ScoreCardItem }
