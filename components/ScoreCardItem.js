import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { testUser1 } from '../db'
import { generalStyling } from '../helpers/styles'
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ScoreCardItem = ({ title, navigation, handleDelete }) => {
    const rightSwipe = () => {
        return (
            <TouchableOpacity style={styles.deleteItem}
                onPress={handleDelete}>
                <View>
                    <Text style={styles.deleteBtnText}>Delete</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const onPress = () => {
        navigation.navigate('ActiveScoreCard', {
            title: title
        })
    }

    return (
        <Swipeable renderRightActions={rightSwipe}>
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
        </Swipeable>
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
    },
    deleteItem: {
        backgroundColor: '#ec9488',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 70,
        marginTop: 10,
        borderRadius: 20
    },
    deleteBtnText: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold'
    }
})

export { ScoreCardItem }
