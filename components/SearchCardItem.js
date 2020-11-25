import React, { useEffect, useState } from 'react';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { State } from 'react-native-gesture-handler';
import { testUser1, appScorecardList } from '../db';
import { generalStyling } from '../helpers/styles'

const SearchCardItem = ({ title, navigation  }) => {
    const [home, setHome] = useState(null);
    const [mounted, setMounted] = useState(false)
//not in userlist = 0, in userlist = 1
  
    useEffect(() => {
        if(!itemInUserList()){
            setHome(0)
        }else{
            setHome(1)
        }
    })

    const itemInUserList = () => {
        var good = false;
        for (var i = 0; i < testUser1.length; i++) {
            if (title == testUser1[i]['title']){
                good = true;
            }
        }
        return good
    }

    const onPress = () => {
        if (!itemInUserList()){
            const scoreCardData = appScorecardList.find((scorecard) => scorecard.title == title)
            testUser1.push(scoreCardData)
            console.log('setting home')
            setHome(1)
        }
        console.log(home)
    }

    return (
        <View  style={styles.card} >
            <View style={styles.cardContent} >
                <Text  style={styles.cardTitleText}>{title}</Text>
                <Icon onPress={onPress} style={styles.iconContent} 
                      name={home==1 ? 'check' : 'plus'}
                      size={30}
                      type='font-awesome' 
                      color='#2B2D2F'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        ...generalStyling.cardStyle,
        alignSelf: 'center'
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
  }); 

export { SearchCardItem }
