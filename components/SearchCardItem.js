import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from "@paraboly/react-native-card";
import { testUser1 } from '../db/userScorecards';


export default function SearchCardItem({ title, navigation  }) {
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
