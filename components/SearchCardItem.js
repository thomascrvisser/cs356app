import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { testUser1 } from '../db/userScorecards';


const SearchCardItem = ({ title, navigation  }) => {
    const onPress = () => {
        var good = true;
        for (var i = 0; i < testUser1.length; i++) {
        if (title == testUser1[i]['title']){
            good = false;
        }
        }
        if(good){
        testUser1.push({title: title,
            description: "from search",
            players: 4,
            headers: ['Players','1','2','3','4','5','6','7','8','9','10'],
            grid: [
            ['Players','1','2','3','4','5','6','7','8','9','10'],
            ['',0,0,0,0,0,0,0,0,0,0],
            ['',0,0,0,0,0,0,0,0,0,0],
            ['',0,0,0,0,0,0,0,0,0,0],
            ['',0,0,0,0,0,0,0,0,0,0],
            ]
        })
        }
        console.log(testUser1);
    }

    return (
        <View style={styles.card} >
            <View style={styles.cardContent}>
                <Text onPress={onPress} style={styles.cardTitleText}>{title}</Text>
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
        marginHorizontal: 20,
        marginVertical: 10
      },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    },
    cardTitleText: {
        fontSize: 30
    }
  }); 

export { SearchCardItem }
