import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Search from './Search';
import Create from './Create';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function navHome() {
    return (
      <HomeScreen/>
    );
}

function navSearch() {
    return (
        <Search/>
    );
}

function navCreate() {
    return (
        <Create/>
    );
}

export default function home() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Search" component={navSearch}/>
                <Tab.Screen name="Home" component={navHome}/>
                <Tab.Screen name="Create" component={navCreate}/>
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