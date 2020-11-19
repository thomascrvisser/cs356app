import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { testUser1 } from '../db'

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
        marginVertical: 15,
        flexDirection: "row",
        justifyContent:'space-between'
    },
    cardTitleText: {
        fontSize: 30
    },
    iconContent: {
        paddingTop: 5
     }
})

export { ScoreCardItem }
