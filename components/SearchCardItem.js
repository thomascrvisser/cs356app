import React, { useEffect, useState } from 'react';
import { Settings, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { State } from 'react-native-gesture-handler';
import { testUser1 } from '../db/userScorecards';


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
        marginVertical: 15,
        flexDirection: "row",
        justifyContent:'space-between'
        
    },
    iconContent: {
       paddingTop: 5
    },
    cardTitleText: {
        fontSize: 30
    }
  }); 

export { SearchCardItem }
