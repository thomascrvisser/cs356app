import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Search from './Search';
import Create from './Create';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function home({ navigation }) {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Search" component={Search}/>
                <Tab.Screen name="Home" children ={()=><HomeScreen navigation={navigation}/>}/>
                <Tab.Screen name="Create" component={Create}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });